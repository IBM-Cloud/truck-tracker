// express webserver https://www.npmjs.com/package/express
// & HTTP body parsing middleware https://www.npmjs.com/package/body-parser
const express = require('express')
const bodyParser = require('body-parser')
const redis = require("redis")

// constants
const PORT = 8080 // the default for Code Engine
const HOST = '0.0.0.0' // listen on all network interfaces
const REDIS_CA = process.env.REDIS_CA  //gets the CA from the kubernetes secrets
const REDIS_URL = process.env.REDIS_URL  // gets URL from the kubernets secrets

//redis
const ca = Buffer.from(REDIS_CA, 'base64').toString('utf-8')
//console.log(ca)
const redisClient = redis.createClient(REDIS_URL, { tls: { ca: ca } })

// redis does not support Promises yet. So using promisify to help there
const { promisify } = require("util");
const redishGetAll = promisify(redisClient.hgetall).bind(redisClient);

// the express app with:
// - static middleware serving out the 'public' directory as a static website
// - the HTTP body parsing middleware to handling POSTed HTTP bodies
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/data', async (req, res) => {
  console.log("in /data")
  const data = await redishGetAll("trucks")
  //console.log(data)
  for (truck in data) {
    data[truck] = JSON.parse(data[truck])
  }
  //console.log(data)
  res.send(data)
})

// start the webserver
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
console.log(new Date() )

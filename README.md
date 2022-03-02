# Truck Tracker: An IoT Pattern Using OpenShift and other IBM Cloud Services
## Combining IBM Cloud services to produce a variety of insights.

This repository contains resources related to the [Truck Tracker: An IoT Pattern Using OpenShift and other IBM Cloud Services
](https://cloud.ibm.com/docs/cloud-databases?topic=cloud-databases-truck-tracker-ibmcloud) tutorial for [IBM Cloud Databases](https://test.cloud.ibm.com/docs/cloud-databases). 

Truck Tracker is a service that receives data from a fleet of trucks as they travel across the country. It could be any data (e.g., fuel consumption, driver details, ambient temperature, or anything else that can be measured as you cruise). For the purposes of this post, it will be the truck's ID and position (lat/long coordinates). Truck Tracker will store the data in various data stores and also show you the current position of the trucks on a map.

Some app users need this data to run analytics. For example, to find out how many miles the fleet has traveled in the last 24 hours or how much fuel it has consumed. For that, all data points can be stored in a reliable document store like [IBM Cloudant](https://www.ibm.com/cloud/cloudant), as well as searched and aggregated at will. IBM Cloudant is a fully managed, distributed database optimized for heavy workloads and fast-growing web and mobile apps.

Other users might need to know where the trucks currently are. For this, you only need the last known position of each truck. In this case, [Redis](https://www.ibm.com/cloud/learn/redis) is a perfect solution — a fast key-value store where a key is the unique truck ID and the value is its last known position.

[IBM Cloud® Databases for Redis](https://www.ibm.com/cloud/databases-for-redis) is a fully managed in-memory data structure store that can be used as a database, cache and message broker.

There may be other, yet unknown, uses for the data that require it to be accessed or stored in different ways.

So your trucks are flying around the country and data is pouring out of them. How do you make sure everyone gets the data they need? Enter [IBM Event Streams](https://www.ibm.com/cloud/event-streams), an event-streaming platform that helps you build smart apps that can react to events as they happen. It is a fully managed service built on open-source [Apache Kafka](https://www.ibm.com/cloud/learn/apache-kafka).

Event Streams can take in the data from the trucks (data producers) and then serve it to the various applications that will use it (data consumers).

Finally, you will need to run your Truck Tracker service somewhere, and for that we will use [Red Hat OpenShift on IBM Cloud](https://www.ibm.com/cloud/openshift), a fast and secure way to containerize and deploy enterprise workloads in Kubernetes clusters. We will provision an Red Hat OpenShift on IBM Cloud cluster, deploy our applications to it and make them available to the database services that need access to it. We will also make a public-facing application to view the positions of trucks on a map. Read more about Red Hat OpenShift on IBM Cloud [here](https://cloud.redhat.com/learn/what-is-openshift).

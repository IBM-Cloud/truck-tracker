resource "ibm_cloudant" "cloudant" {
  name     = "truckTracker"
  location = "eu-gb"
  plan     = "standard"
  resource_group_id = ibm_resource_group.resource_group.id

}


resource "ibm_resource_key" "cloudant_credentials" {
  name                  = "my-db-key"
  role                  = "Manager"
  resource_instance_id  = ibm_cloudant.cloudant.id
}

output "cloudant_credentials" {
  value = ibm_resource_key.cloudant_credentials.credentials
  sensitive = true
}


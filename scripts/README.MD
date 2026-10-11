# Data loading procedure:

Call getRestaurants -> getFacilities.js
{
facilityId: (from ahs)
name: (from ahs)
address: (from ahs)
area: (from ahs)
category: (from ahs)
}

Call getInspectionsAndViolations -> retrieveApi.js
{
facilityId (from above)
/// exactly the fields from the ahs endpoint (date)
}
Call ahsViolations -> retrieveViolations.js
{
facilityId (from above)
inspectionId (from above)
// exactly from ahs (including date)
}

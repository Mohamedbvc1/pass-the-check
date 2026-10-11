export async function getAllRestaurants() {
  const allAreasResponse = await fetch("/api/ahsfacility");
  if (allAreasResponse.status !== 200) {
    console.log(allAreasResponse);
    throw Error("Something is wonrg");
  }
  return allAreasResponse.json();
}

export async function getAllAreas() {
  const allAreasResponse = await fetch("/api/ahsfacility/areas");
  if (allAreasResponse.status !== 200) {
    console.log(allAreasResponse);
    throw Error("Something is wonrg");
  }
  return allAreasResponse.json();
}

export async function getRestaurantsByArea(area) {
  const restaurantsResponse = await fetch(`/api/ahsfacility/findByArea?area=${area}`);
  if (restaurantsResponse.status !== 200) {
    console.log(restaurantsResponse);
    throw Error("Something is wonrg");
  }
  return restaurantsResponse.json();
}

export async function getInspectionByFacilityId(facilityid) {
  const inspectionsResponse = await fetch(`/api/ahsinspection?id=${facilityid}`);
  if (inspectionsResponse.status !== 200) {
    throw Error("Something is wonrg");
  }
  console.log(inspectionsResponse)
  return inspectionsResponse.json();
}

export async function getViolationsByInspectionId(inspectionid) {
  const violationsResponse = await fetch(`/api/ahsviolation?id=${inspectionid}`);
  if (violationsResponse.status !== 200) {
    throw Error("Something is wonrg");
  }
  return violationsResponse.json();
}

export async function getAllViolationsForRestaurant(facilityid) {
    const inspectionsResponse = await fetch(`/api/ahsinspection?id=${facilityid}`);
    if (inspectionsResponse.status !== 200) {
      throw Error("Something is wrong");
    }
    const allInspectionIDs = []
    const allViolations = []
    const allInspections = await inspectionsResponse.json();

    // for (let i = 0; i < allInspections.length; i++) {

    let inspectionID = allInspections[0].inspectionid
    
    allInspectionIDs.push(inspectionID)

    const violationsForEachInspection = await fetch(`/api/ahsviolation?id=${inspectionID}`);

    allViolations.push(...await violationsForEachInspection.json())
    // }

    return allViolations
}

export async function getRestaurantInformation(facilityid) {
    const restaurantInfoResponse = await fetch(`/api/ahsfacility/info?id=${facilityid}`);
    if (restaurantInfoResponse.status !== 200) {
      throw Error("Something is wrong");
    }

    // console.log(await restaurantInfoResponse.json())
    
    const restaurantInformation = await restaurantInfoResponse.json()

    return restaurantInformation
}

// const restaurantDetailResponse = await fetch(`/api/ahsfacility/findByName?name=${name}`);


// { $regex : '.*'+ _keyword + '.*' }


export async function getRestaurantByname(name) {
  const restaurantDetailResponse = await fetch(`/api/ahsfacility/findByName?name=${name}`);
  if (restaurantDetailResponse.status !== 200) {
    throw Error("Something is wrong");
  }
  
  const restaurantDetail = await restaurantDetailResponse.json()

  return restaurantDetail
}

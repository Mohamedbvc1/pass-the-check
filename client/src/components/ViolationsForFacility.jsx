import { getInspectionByFacilityId, getAllViolationsForRestaurant, getRestaurantInformation } from '../api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"


function ViolationsForFacility() {
    const [user, setUser] = useState([])
    const [violations, setViolations] = useState([])
    const [restaurantInfo, setRestaurantInfo] = useState([{name: '', address: '', area: '', category: '', facilityid: ''}])
    const [loadError, setLoadError] = useState()
    const { id } = useParams();


    useEffect(() => {
        getInspectionByFacilityId(id)
            .then(setUser)
            .catch(setLoadError);

        getAllViolationsForRestaurant(id)
            .then(setViolations)
            .catch(setLoadError);

        getRestaurantInformation(id)
            .then(setRestaurantInfo)
            .catch(setLoadError)
    }, [])
  
    // console.log(violations);
    // console.log(restaurantInfo)
    
    return (
      <>
        <div>
            <h1>{ restaurantInfo[0].name }</h1>
            <h2>{ restaurantInfo[0].address }</h2>
            <h2>These are the violation categories:</h2>
            {/* {user.map(inspection => <div key={inspection._id}>{inspection.inspectionid}</div>)} */}

            {violations.map(vioCategory => <div key={vioCategory._id}>{vioCategory.category}</div>)}
        </div>
      </>
    );
}
  
export default ViolationsForFacility;
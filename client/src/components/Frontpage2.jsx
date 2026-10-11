import React, { useEffect, useState, useRef } from "react";
import reactLogo from "../assets/react.svg";
import logo from "../assets/PassTheCheck.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { getAllAreas, getAllRestaurants, getRestaurantsByArea, getRestaurantByname, } from "../api";
import "./Frontpage2.css";
import { Navigate, useNavigate } from "react-router-dom";

function FacilityCard({ facility }) {
  const navigate = useNavigate();
  return (
    <div key={facility.facilityid} className="card" onClick={() => navigate(`/restaurant/${facility.facilityid}`)}>
      <FacilityRow facility={facility} />
    </div>
  );
}


function decodeHtml(string) {
  return string?.replace("&amp;", "&")
                .replace("<br/>", "\n")
                .replace("<br />", "\n")
                .replace("&gt;", ">")
                .replace("&lt;", "<")
                .replace("&ge;", ">=")
                .replace("&le", "<=")
                .replace("&#39;", "'")
                .replace("&#176;", "deg")
}




function FacilityRow({ facility }) {
  return (
    <table>
      <tbody>
        <tr key={facility.id}>
        <td className="facility-card-content">
            <div>{decodeHtml(facility.name)}</div>
            <div>{facility.area}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function FrontPage2() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState();
  const [facilities, setFacilities] = useState([]);
  const [loadError, setLoadError] = useState();
  const [messageVisible, setMessageVisiblity] = useState(true);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const cardContainerRef = useRef(null);

  async function getAreas() {
    const allAreas = await getAllAreas();
    setAreas(allAreas);
  }

  async function getRestaurants() {
    try {
      const facilitiesByArea = await getRestaurantsByArea(selectedArea, offset, limit);
      if (facilitiesByArea.length === 5) {
        setHasMore(false);
      } else {
        setFacilities((prevFacilities) => [...prevFacilities, ...facilitiesByArea]);
        setOffset((prevOffset) => prevOffset + limit);
      }
    } catch (error) {
      setLoadError(error);
    }
  }


  async function getRestByname(search) {
      try {
        const restaurantsByName = await getRestaurantByname(search);
        setFacilities(restaurantsByName);
    } catch (error) {
      setLoadError(error);
    }
  }



  useEffect(() => {
    getAreas();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      setOffset(0);
      setFacilities([]);
      setHasMore(true);
      getRestaurants();
    }
  }, [selectedArea]);


  

  
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        getRestaurants();
      }
    }, { threshold: 1 });
    if (cardContainer) {
      observer.observe(cardContainer);
    }
    return () => {
      if (cardContainer) {
        observer.unobserve(cardContainer);
      }
    };
  }, [hasMore]);

  function searchByName(e) {
    const trimSearch = e.target.value.trim();
    const sanitizedSearch = trimSearch.replaceAll(/[.*+?^${}()|&[\]\\]/g, '');
    if (sanitizedSearch.length < 3 ) {
      return
    }
    console.log("sanitized results", sanitizedSearch)
    getRestByname(sanitizedSearch);

  }

  return (

    <div className="body">
      <div className="imag" onClick={() => setFacilities([])}>
        <div><img src={logo} className="logo" alt="logo" /></div>
        <div><h1 className="roboto-slab-global-font">
          Pass the Check
        </h1></div>
      </div>
      <div className="search-wrapper">
        <input onChange={ searchByName } className="form-control" id="searchByName" placeholder="Search by Restaurant Name"></input>
        <select
          className="form-select"
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Select an area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {facilities.length > 0 && (
        <div ref={cardContainerRef} className="cardContainer">
          {facilities.map((facility) => (
            <FacilityCard key={facility.facilityid} facility={facility} />
          ))}
          {loadError && <div>Error: {loadError.message}</div>}
        </div>
      )}

      {!(facilities.length > 0) && (
        <p className="infoBanner">Please select where would you like to dine!</p>
      )} 
      </div>
  
  );
}

export default FrontPage2;


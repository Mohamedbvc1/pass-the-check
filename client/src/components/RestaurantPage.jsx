import React, { useState, useEffect } from 'react';
import './RestaurantPage.css';
import { useParams } from 'react-router-dom'
import { getInspectionByFacilityId, getAllViolationsForRestaurant, getRestaurantInformation } from '../api.js'
import SearchRestaurantOnMap from '../map/SearchRestaurantOnMap.jsx'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ViolationsModal from "./violationModal.jsx";
import { BarCharts } from './Charts.jsx';
import YummyFood from "../assets/LittleChef.png";




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




function RestaurantPage() {
  const [boxes, setBoxes] = useState([]);
  const [violations, setViolations] = useState([]);
  const [restaurant, setRestaurantInfo] = useState([{ name: "", address: "", area: "", category: "", facilityid: "" }]);
  const [loadError, setLoadError] = useState();
  const { id } = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [selectViolation, setSelectViolation] = useState();

  useEffect(() => {
    getAllViolationsForRestaurant(id).then(setViolations).catch(setLoadError);

    getRestaurantInformation(id).then(setRestaurantInfo).catch(setLoadError);
  }, []);

  useEffect(() => {
    const generateBoxes = () => {
      const newBoxes = [];
      // for (let i = 0; i < 10; i++) {
      //   // newBoxes.push(<div key={i} className="rectangular-box">{i}</div>);
      // }

      if (violations.length == 0) {

        return <div className="rectangular-box">
          <div> <img
            src={YummyFood}
            className="logo react"
            alt="YummyFood"
          /></div>

          <div className='roboto-slab-global-font'>There are no violations at this restaurant.</div>
        </div>
      } else {
        newBoxes.push(
          violations.map((vioCategory) => (
              <div
                key={vioCategory._id}
                className="rectangular-box"
                onClick={() => {
                  setModalShow(true);
                  setSelectViolation(vioCategory);
                }}
              >
                {vioCategory.category}
              </div>
          ))
        )
      };
      return newBoxes;
    };

    setBoxes(generateBoxes());

    // window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [violations]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setBoxes((prevBoxes) => [...prevBoxes, ...generateBoxes()]);
  };

  return (
    <div className='restaurant-page'>
      <div className="restaurant-page-header">
        <header>
          <h1>{decodeHtml(restaurant[0].name)}</h1>
          <h3>{restaurant[0].address}</h3>
        </header>
      </div>
      <div className='violations-and-meter'>
        <div className="violations-container">{boxes}</div>
        <div className='meter-container'> <BarCharts facilityid={id} /> </div>
      </div>
      {restaurant[0].name && <SearchRestaurantOnMap name={restaurant[0].name} address={restaurant[0].address} />}
      <ViolationsModal
        violation={selectViolation}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default RestaurantPage;

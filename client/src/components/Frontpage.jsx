import "./Frontpage.css"
import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import logo from "../assets/PassTheCheck.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { getAllRestaurants, } from "../api";
import { BarCharts } from "./Charts";


function SelectRow({ selected }) {


  const [targetRoute, setTargetRoute] = useState()

  async function setRoute(targetRoute) {
    try {
      setTargetRoute(targetRoute)
      window.location.href = targetRoute
    }
    catch (error) {
      console.log("error: ", error)
    }
  }

  return (

    <tr key={selected.id}>
      <td>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </td>
      <td onClick={() => setRoute(`/restaurant/${selected.facilityid}`)}>
        <div>{selected.name}</div>
        <div>{selected.address}</div>
        <div>{selected.area}</div>
        <div></div>
      </td>
      <td><BarCharts facilityid={selected.facilityid} /></td>
    </tr>
  )
}
function DefaultFacilities({ facilities }) {

  const [targetRoute, setTargetRoute] = useState()

  async function setRoute(targetRoute) {
    try {
      setTargetRoute(targetRoute)
      window.location.href = targetRoute
    }
    catch (error) {
      console.log("error: ", error)
    }
  }

  return (
    <tr key={facilities.id}>
      <td>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </td>
      <td onClick={() => setRoute(`/restaurant/${facilities.facilityid}`)}>
        <div>{facilities.name}</div>
        <div>{facilities.address}</div>
        <div>{facilities.area}</div>
        <div></div>
      </td>
      <td><BarCharts facilityid={facilities.facilityid} /></td>
    </tr>
  )
}

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loadError, setLoadError] = useState();
  const [selected, setSelected] = useState();

  async function getAllfacilities() {
    try {
      const allFacilities = await getAllRestaurants();
      setFacilities(allFacilities);
    } catch (error) {
      setLoadError(error);
    }
  }

  useEffect(() => {
    getAllfacilities();
  }, []);

  return (
    <>
      <div className="imag">
        <div><img src={logo} className="logo" alt="logo" /></div>
        <div><h1>Pass The Check</h1></div>
      </div>
      <div className="search-wrapper">
        <select className="form-select" onChange={(e) => {
          const c = facilities?.filter((x) => x.area === e.target.value);
          setSelected(c);
        }}>
          {facilities.map((facilities) => (
            <option key={facilities.facilityid} value={facilities.area}>{facilities.area}</option>
          ))}
        </select>
      </div>
      <div className="cardContainer">
        {loadError && <div>Error: {loadError.message}</div>}
        {selected ? selected.map((selected) => (
          <div key={selected.facilityid} className="card">
            <SelectRow selected={selected} />
          </div>
        )) : facilities.slice(0, 10).map((facilities) => (
          <div key={facilities.facilityid} className="card">
            <DefaultFacilities facilities={facilities} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Facilities;

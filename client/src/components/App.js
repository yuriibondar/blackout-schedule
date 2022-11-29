import React, { useState, useEffect } from "react";
import useSchedule from '../hooks/useSchedule';
import './App.css';
import SearchInput from "./SearchInput";
 

function App() {
  const [schedule, fetchSchedule] = useSchedule(null);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [apiData, setApiData] = useState();
  // useEffect(() => {
  //   fetch("/api")
  //   .then(
  //     data => {
  //       setApiData(data)
  //     }
  //   )
  // }, [])

  // useEffect(() => {
  //   setSelectedVideo(videos[0]);
  // }, [videos]);

  const defaultAddress = {
    city_id: "510100000",
    street_id: "1761",
    house_id: "43820"
  }

  const addressYunosti = {
    city_id: "510100000",
    street_id: "1783",
    house_id: "48666",
    form_id: "disconnection_detailed_search_form"
  }

  const addressChornovola = {
    city_id: "510100000",
    street_id: "1761",
    house_id: "43820",
    form_id: "disconnection_detailed_search_form"
  }
  const addressAtb = {
    city_id: "510100000",
    street_id: "1334",
    house_id: "43729",
    form_id: "disconnection_detailed_search_form"
  }

  const fetchScheduleForAddress = (address = addressChornovola) => {    
    fetchSchedule(address);
  }

  return (
    <div className="App">
      <button onClick={() => fetchScheduleForAddress(addressChornovola)}>Fetch Chornovola</button>
      <button onClick={() => fetchScheduleForAddress(addressAtb)}>Fetch ATB</button>
      <button onClick={() => fetchScheduleForAddress(addressYunosti)}>Fetch Yunosti</button>
      <div>
        <div className="page-title">Онлайн графік погодинних відключень м.Вінниця</div>
        <div className="site-main-container">
          <div className="custom-fields-wrapper">
            <div className="field-container">
              <SearchInput placeholder="Вулиця" />
              {/* <input type="text" placeholder="Вулиця"/> */}
            </div>
            <div className="field-container">
              <SearchInput placeholder="Будинок" />
              {/* <input type="text" placeholder="Будинок"/> */}
            </div>
          </div>
          <div id="scheduleContainer" dangerouslySetInnerHTML={{__html: schedule}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import useSchedule from '../hooks/useSchedule';
import './App.css';
import SearchHouseInput from "./SearchHouseInput";
import SearchStreetInput from "./SearchStreetInput";
 

function App() {
  const [schedule, fetchSchedule] = useSchedule(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const [houseSearchterm, setHouseSearchterm] = useState('');

  const [selectedStreet, setSelectedStreet] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    setQueueNumber(document.querySelector('[title^="Номер черги"]')?.innerText);
  }, [schedule]);

  useEffect(() => {
    selectedHouse && selectedHouse.id && fetchSchedule(selectedStreet.id, selectedHouse.id);
  }, [selectedHouse])

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
  
  const onStreetSelected = (id, name) => {
    console.log('selectedId', id, 'selectedName', name)
    setSelectedStreet({id, name})
    setHouseSearchterm('')
  }
  const onHouseSelected = (id, name) => {
    console.log('selectedHouseId', id, 'selectedHouseName', name)
    setSelectedHouse({id, name})
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
              <SearchStreetInput onSelected={onStreetSelected}/>
            </div>
            <div className="field-container">
              <SearchHouseInput streetId={selectedStreet && selectedStreet.id} value={houseSearchterm} onSelected={onHouseSelected}/>
              {/* <input type="text" placeholder="Будинок"/> */}
            </div>
          </div>
          
          <div className="queue-number">Обрана адреса: {selectedStreet?.name}, {selectedHouse?.name}</div>
          <div className="queue-number">Номер черги: {queueNumber}</div>
          <div id="scheduleContainer" dangerouslySetInnerHTML={{__html: schedule}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;

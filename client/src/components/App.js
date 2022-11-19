import React, { useState, useEffect } from "react";
import useSchedule from '../hooks/useSchedule';
import './App.css';

function App() {
  const [schedule, fetchSchedule] = useSchedule(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [apiData, setApiData] = useState({});
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setApiData(data)
      }
    )
  }, [])

  // useEffect(() => {
  //   setSelectedVideo(videos[0]);
  // }, [videos]);

  const fetchScheduleForAddress = () => {
    const defaultAddress = {
      city_id: "510100000",
      street_id: "1761",
      house_id: "43820"
    }
    fetchSchedule(defaultAddress);
  }

  return (
    <div className="App">
      <button onClick={fetchScheduleForAddress}>Fetch Schedule</button>
      <div>schedule:
        <div id="scheduleContainer" dangerouslySetInnerHTML={{__html: schedule}}>
          
        </div>
      </div>
    </div>
  );
}

export default App;

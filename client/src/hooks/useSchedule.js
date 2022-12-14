import { useState, useEffect } from "react";
import voe from "../api/voe";

const useSchedule = (defaultAddress) => {
    const [schedule, setSchedule] = useState([]);
  
    useEffect(() => {
        fetchSchedule(defaultAddress);
    }, [defaultAddress]);
  
    const fetchSchedule = async (streetId, houseId) => {
      const result = await voe.post("/", {        
        city_id: "510100000",
        street_id: streetId,
        house_id: houseId,
        form_id: "disconnection_detailed_search_form"
      }, {
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        params: {
            "_wrapper_format": "drupal_ajax"
        }
      });
      console.log("result - ", result);
      setSchedule(result.data[3].data);
    };
  
    return [schedule, fetchSchedule];
  };
  
  export default useSchedule;
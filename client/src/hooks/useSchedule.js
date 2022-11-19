import { useState, useEffect } from "react";
import voe from "../api/voe";

const useSchedule = (defaultAddress) => {
    const [schedule, setSchedule] = useState([]);
  
    useEffect(() => {
        fetchSchedule(defaultAddress);
    }, [defaultAddress]);
  
    const fetchSchedule = async (address) => {
      const result = await voe.post("/", address, {
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        params: {
            "_wrapper_format": "drupal_ajax"
        }
      });
      console.log(result);
      setSchedule(result.data[3].data);
    };
  
    return [schedule, fetchSchedule];
  };
  
  export default useSchedule;
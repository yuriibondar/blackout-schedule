import axios from "axios";

// Set config defaults when creating the instance
export default axios.create({
    baseURL: "https://voe.com.ua/disconnection/detailed"
})
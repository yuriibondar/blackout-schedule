import axios from "axios";

// Set config defaults when creating the instance
export default axios.create({
    baseURL: "/api"
})
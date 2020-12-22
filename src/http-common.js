import axios from "axios";

export default axios.create({
  baseURL: "https://flow-arjun.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});

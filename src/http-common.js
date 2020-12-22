import axios from "axios";

export default axios.create({
  baseURL: "https://flow-arjun.herokuapp.com/flows",
  headers: {
    "Content-type": "application/json"
  }
});

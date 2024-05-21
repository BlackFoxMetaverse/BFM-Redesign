import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.blackfoxmetaverse.io",
  // baseURL: "https://jlol8hc60c.execute-api.ap-south-1.amazonaws.com/dev",
});

export default instance;

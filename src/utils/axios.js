import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.blackfoxmetaverse.io",
});

export default instance;

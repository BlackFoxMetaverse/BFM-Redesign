import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.blackfoxmetaverse.io",
  // baseURL:
  //   "https://7780-2405-201-4014-6807-3dbd-8c6f-b161-116b.ngrok-free.app/",
});

export default instance;

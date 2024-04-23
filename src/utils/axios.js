import axios from "axios";

export default function instance() {
  axios.create({
    baseURL: "https://api.blackfoxmetaverse.io",
  });
}

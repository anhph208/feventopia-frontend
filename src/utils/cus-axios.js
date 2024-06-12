import axios from "axios";

const instance = axios.create({
  baseURL: "https://feventopia.azurewebsites.net",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

});

export default instance;
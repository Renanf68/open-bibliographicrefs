import axios from "axios";

const api = axios.create({
  baseURL: "https://doi.org/",
})

export default api

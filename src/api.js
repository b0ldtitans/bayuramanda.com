import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const imgBaseURL = "http://localhost:8000/api/img/";

export { api, imgBaseURL };

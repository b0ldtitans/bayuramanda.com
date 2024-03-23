import axios from "axios";

const api = axios.create({
  baseURL: "https://bayuramanda.azani.dev/api",
});

const imgBaseURL = "https://bayuramanda.azani.dev/api/img/";

export { api, imgBaseURL };

import { create } from "apisauce";
import { Urls } from "../constants/url";

const api = create({
  baseURL: Urls.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

import { create } from "apisauce";
import { Urls } from "../constants/url";

const api = create({ baseURL: Urls.baseUrl });

export default api;

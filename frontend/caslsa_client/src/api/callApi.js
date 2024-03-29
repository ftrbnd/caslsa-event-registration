import { Urls } from "../constants/url";

export const callApi = async (endpoint, method, body) => {
  const response = await fetch(Urls.baseUrl + endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

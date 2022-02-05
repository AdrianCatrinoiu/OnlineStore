import axios from "axios";

const API_URL = "http://localhost:3000";

export const axiosCall = async ({ method, path, token = null, data }) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };

  const res = axios({
    method: method,
    url: API_URL + path,
    headers: headers,
    data: data,
  });
  return res;
};

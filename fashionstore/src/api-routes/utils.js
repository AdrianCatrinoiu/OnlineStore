import axios from "axios";

export const axiosCall = async ({ method, path, token = null, data }) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };
  console.log(token);
  const res = axios({
    method: method,
    url: process.env.REACT_APP_BASE_URL + path,
    headers: headers,
    data: data,
  });
  return res;
};

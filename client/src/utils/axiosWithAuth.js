import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://localhost:5001",
    headers: {
      Authorization: JSON.parse(token),
    },
  });
};

import axios from "axios";

const useAxios = () => {
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

export default useAxios;

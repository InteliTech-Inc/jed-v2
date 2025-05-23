import { API_URL } from "@/constants/url";
import axios from "axios";

export const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

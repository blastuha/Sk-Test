import axios from "axios";

//todo: сделать через env
const API_URL = "https://api.skilla.ru/mango";
const TOKEN = "testtoken";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

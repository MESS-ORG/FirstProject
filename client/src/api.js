import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const signup = (user) => api.post("/auth/signup", user);
export const login = (user) => api.post("/auth/login", user);

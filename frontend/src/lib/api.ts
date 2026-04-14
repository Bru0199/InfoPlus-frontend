import axios from "axios";
import { CHAT_REQUEST_TIMEOUT_MS } from "./constants";

const getBaseURL = () => {
  if (typeof process.env.NEXT_PUBLIC_API_URL === "string" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return "/api"; // same-origin so Next.js rewrites proxy to backend
  }
  return "http://localhost:4000/api";
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // MUST be true to send session cookies
  timeout: CHAT_REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token from localStorage to every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

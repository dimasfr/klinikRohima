import axios from "axios";
import apiClient from "../utils/apiClient";

export async function verifyUser() {
  try {
    const response = await apiClient.get("/auth/verify");
    const user = response.data.user;

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err) {
    console.error("Token tidak valid:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
}

export const login = async (username, password) => {
  const response = await axios.post("/api/auth/login", { username, password });
  return response.data;
};

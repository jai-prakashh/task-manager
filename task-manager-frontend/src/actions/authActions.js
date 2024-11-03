import api from "../api";
import { toast } from "react-toastify";

export const login = (username, password, navigate) => async (dispatch) => {
  const { data } = await api.post("/api/auth/login", {
    username,
    password,
  });
  dispatch({ type: "LOGIN_SUCCESS", payload: data });
  localStorage.setItem("token", data.token);
  toast.success("User logged in successfully");
  navigate("/");
};

export const register = (username, password, navigate) => async (dispatch) => {
  const { data } = await api.post("/api/auth/register", {
    username,
    password,
  });
  dispatch({ type: "REGISTER", payload: data });
  localStorage.setItem("token", data.token);
  toast.success("User registered successfully");
  navigate("/login");
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
  toast.success("User logged out successfully");
  navigate("/login");
};

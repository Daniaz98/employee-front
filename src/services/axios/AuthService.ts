import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function register(userData: RegisterData) {
  const res = await axios.post(`${baseUrl}authentication/register`, userData);
  return res.data;
}

export async function login(credentials: LoginCredentials) {
  const res = await axios.post(`${baseUrl}authentication/login`, credentials);

  // Se sua API retorna token
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

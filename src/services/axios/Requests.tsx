import axios, { type AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL_FIXED,
    headers: {
        'Content-Type': 'application/json',
    },
})


export async function AxiosGet<T = unknown>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
  //const auth = await getAuthHeaders();
  const response = await api.get<T>(url, {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      //...auth,
    },
  });
  return response.data;
}
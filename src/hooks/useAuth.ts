import { useState } from "react";
import { login, register, logout, getToken } from "../services/axios/AuthService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}


export default function useAuth() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(credentials: LoginCredentials) {
        setLoading(true)
        setError(null)
        try {
            const data = await login(credentials)

            if (data?.token) {
                localStorage.setItem("authToken", data.token)
            }

            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError((err as any).response?.data?.message || err.message || "Erro ao fazer login");
            } else {
                setError("Erro desconhecido ao fazer login");
            }
            return null;
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister(userData: RegisterData) {
        setLoading(true)
        setError(null)
        try {
            const data = await register(userData)
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError((err as any).response?.data?.message || err.message || "Erro ao fazer registrar");
            } else {
                setError("Erro desconhecido ao fazer registo");
            }
            return null;
        } finally {
            setLoading(false)
        }
    }

    function handleLogout() {
        logout()
        localStorage.removeItem("authToken")
    }

    return {
        handleLogin,
        handleRegister,
        logout: handleLogout,
        getToken,
        loading,
        error
    }
}
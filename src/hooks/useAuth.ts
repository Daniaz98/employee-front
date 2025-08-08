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
            return data;
        } catch (err: any) {
            setError(err.respons?.data?.message || "Erro ao fazer login")
            return null
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
        } catch (err: any) {
            setError(err.respons?.data?.message || "Erro ao registrar")
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        handleLogin,
        handleRegister,
        logout,
        getToken,
        loading,
        error
    }
}
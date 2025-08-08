import { useState } from "react"

export interface ApiEmp {
    name: string
    email: string
    address: string
}

export default function useRegister() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const registrarEmp = async (payload: ApiEmp) => {
        setLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("name", payload.name)
            formData.append("email", payload.email)
            formData.append("address", payload.address)

            const res = await fetch(`${baseUrl}employee`,   {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                })

            if (!res.ok) {
                let errorMessage = "Erro ao salvar registro"
                try {
                    const data = await res.json()
                    errorMessage = data.message || errorMessage
                } catch (_) {}
                throw new Error(errorMessage)
            }
        } catch (err: any) {
            setError(err.message || "Erro desconhecido");
            throw err;
            } finally {
                setLoading(false);
            }
    }

    return { registrarEmp, loading, error}
}
import { useState } from "react"

export interface ApiEmp {
    name: string
    email: string
    address: string
    photoId?: File | null
    department: string
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
            formData.append("department", payload.department)

            if (payload.photoId) {
                formData.append('photoId', payload.photoId)
            }

            const res = await fetch(`${baseUrl}employee`,   {
                    method: "POST",
                    body: formData,
                })

            if (!res.ok) {
                let errorMessage = "Erro ao salvar registro"
                try {
                    const data = await res.json()
                    errorMessage = data.message || errorMessage
                } catch (_) {}
                throw new Error(errorMessage)
            }

            const newEmp = await res.json()
            return newEmp
        } catch (err: any) {
            setError(err.message || "Erro desconhecido");
            throw err;
            } finally {
                setLoading(false);
            }
    }

    return { registrarEmp, loading, error}
}
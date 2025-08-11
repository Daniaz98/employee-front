import { useState } from "react"

export interface ApiEmp {
    id: string
    name: string
    email: string
    address: string
}

export default function useEditor() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const atualizarEmp = async (payload: ApiEmp, files?: FileList | null) => {
        setLoading(true)
        setError(null)

        try {
            const formData = new FormData();
            formData.append("name", payload.name);
            formData.append("email", payload.email);
            formData.append("address", payload.address);
            
            if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                formData.append("files", file);
            });
            }

            const res = await fetch(`${baseUrl}employee/${payload.id}`,   {
                    method: "PUT",
                    body: formData
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

    return { atualizarEmp, loading, error}
}
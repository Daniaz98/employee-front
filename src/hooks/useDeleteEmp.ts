import { useCallback, useState } from "react"


export default function DeleteEmp() {
    const [isDeleting, setIsDeleting] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const excluirEmp =  useCallback(async (id: string): Promise<boolean> => {
        setIsDeleting(true);

        const res = await fetch(`${baseUrl}employee/${id}`, { method: "DELETE" })

        if (!res.ok) {
            setIsDeleting(false)
            throw new Error(`Falha ao excluir funcionário (status ${res.status})`)
        }
        setIsDeleting(false)

        return true;

    }, [])

    return {excluirEmp, isDeleting}
}
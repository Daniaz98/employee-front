import { useCallback, useEffect, useState } from "react";

export default function usePhotoEmp(id: string) {
    const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchPhoto = useCallback(async () => {
        if (!id) return

        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`${baseUrl}photo/download/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

            if (!res.ok) {
                throw new Error(`Erro HTTP ${res.status}`);
            }

            const blob = await res.blob()
            setPhotoBlob(blob)
        } catch {
            throw new Error("Erro ao carregar fotos.");
        } finally {
            setLoading(false)
        }

    }, [baseUrl, id])

        useEffect(() => {
            fetchPhoto();
        }, [fetchPhoto]);
    
        return {photoBlob, loading, error}
}
import { useCallback, useState } from "react";

export default function usePhotoUpload(id: string) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const uploadPhoto = useCallback(async (file: File) => {
        if (!id || !file) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('photo', file);

            const res = await fetch(`${baseUrl}photo/upload/${id}`, {
                method: "POST",
                body: formData 
            });

            if (!res.ok) {
                throw new Error(`Erro HTTP ${res.status}`);
            }

            const result = await res.json(); 
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao fazer upload da foto";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [baseUrl, id]);

    return { uploadPhoto, loading, error };
}
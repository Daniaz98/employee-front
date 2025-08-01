import { useCallback, useEffect, useState } from "react";
import type { Employee } from "../types/Employee";


export default function useListEmps() {
    const [data, setData] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`${baseUrl}employee`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                throw new Error(`Erro HTTP ${res.status}`);
            }

            const json: Employee[] = await res.json();
            setData(json)
        } catch {
            throw new Error("Erro ao carregar funcionários.");
        } finally {
            setLoading(false)
        }
    }, [baseUrl])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, loading, error}
}
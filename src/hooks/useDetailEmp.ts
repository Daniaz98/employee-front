import { useCallback, useEffect, useState } from "react"
import type { Employee } from "../types/Employee"

export interface ApiEmployee {
    id: string
    name: string
    email: string
    address: string
    photoId?: string | null
    department: string
}


export default function useDetailEmp(id: string | undefined) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [employee, setEmployee] = useState<Employee | null>(null)

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const fetchEmployee = useCallback(async () => {
        if (!id) {
            setEmployee(null)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`${baseUrl}employee/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!res.ok) {
                throw new Error(`Erro Http ${res.status}: ${res.statusText}`)
            }

            const json: Employee = await res.json()
            setEmployee(json)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao carregar funcionário!"
            setError(errorMessage)
            setEmployee(null)
        } finally {
            setLoading(false)
        }
    }, [id, baseUrl])

    useEffect(() => {
        fetchEmployee()
    }, [fetchEmployee])

    const refetch = useCallback(() => {
        fetchEmployee()
    }, [fetchEmployee])

    return {
        employee,
        loading,
        error,
        refetch
    }
}
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import useDetailEmp from "../../hooks/useDetailEmp";
import EmployeePhoto from "../../components/EmployeePhoto";

export default function Employee() {
    const {id} = useParams<{id: string}>()
    const {employee, loading, error, refetch} = useDetailEmp(id)
    const navigate = useNavigate()

    const handleEdit = (path: string) => {
        navigate(path)
    }

    if (loading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>
    if (!employee) return <div>Funcionário não encontrado</div>

    return (
        <div>
            <Header/>
            <div className="container mx-auto p-6 min-h-screen" style={{ backgroundColor: '#242424' }}>
                <div className="flex gap-8 items-start">
                    {/* Lado esquerdo */}
                    <div className="flex-shrink-0">
                        <div className="w-150 h-150 overflow-hidden rounded-lg shadow-lg">
                            <EmployeePhoto id={employee.id} />
                        </div>
                    </div>
                    {/* Lado direito */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-300 mb-4">{employee.name}</h1>
                            <div className="space-y-3">
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-300">Email:</span> 
                                    <span className="ml-2 text-gray-300">{employee.email}</span>
                                </p>
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-300">Endereço:</span> 
                                    <span className="ml-2 text-gray-300">{employee.address}</span>
                                </p>
                            </div>
                        </div>
                        {/* Botões */}
                        <div className="flex gap-4">
                            <button
                                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                                onClick={() => handleEdit(`/edit/${employee.id}`)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"

                            >
                                Excluir
                            </button>
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                                onClick={refetch}
                            >
                                Recarregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
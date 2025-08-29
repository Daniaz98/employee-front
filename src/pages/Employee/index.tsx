import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import useDetailEmp from "../../hooks/useDetailEmp";
import EmployeePhoto from "../../components/EmployeePhoto";
import { useState } from "react";
import useDeleteEmp from "../../hooks/useDeleteEmp";
import { ModalDelete } from "../../components/ModalDelete";

export default function Employee() {
    const { excluirEmp, isDeleting} = useDeleteEmp()
    const {id} = useParams<{id: string}>()
    const {employee, loading, error, refetch} = useDetailEmp(id)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = (id: string) => {
        setSelectedId(id)
        setIsModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (selectedId !== null) {
            const success = await excluirEmp(selectedId)
            if (success) {
                console.log("item excluido")
                setIsModalOpen(false)
                setShowSuccessMessage(true)

                setTimeout(() => {
                    navigate('/home')
                }, 3000)
            } else {
                setIsModalOpen(false)
                alert('Erro ao excluir funcionário. Tente novamente.')
            }
        }
        setIsModalOpen(false)
    }

    const handleEdit = (path: string) => {
        navigate(path)
    }

    if (loading) return <div>Carregando...</div>
    if (error) return <div>Erro: {error}</div>
    if (!employee) return <div>Funcionário não encontrado</div>

    return (
        <div>
            <Header/>
            <div className="container mx-auto p-6 min-h-screen bg-gradient-to-r from-gray-800 to-purple-800">

                {/* mensagem de sucesso */}
                {showSuccessMessage && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                        <div className="bg-white/10 backdrop-blur-lg backdrop-saturate-150 
                                       border border-green-400/30 p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4
                                       backdrop-brightness-110 animate-pulse">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Sucesso!</h3>
                                <p className="text-white/80">Funcionário excluído com sucesso</p>
                                <p className="text-white/60 text-sm mt-2">Redirecionando...</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-8 items-start">

                    {/* Lado esquerdo */}
                    <div className="flex-shrink-0">
                        <div className="w-150 h-150 overflow-hidden rounded-lg p-6">
                            <EmployeePhoto id={employee.id} />
                        </div>
                    </div>
                    {/* Lado direito */}
                    <div className="flex-1">
                        <div className="mb-6 p-6">
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
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-300">Setor:</span>
                                    <span className="ml-2 text-gray-300">{employee.department}</span>
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
                                onClick={() => handleDelete(employee.id)}
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
                <ModalDelete
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    loading={isDeleting}
                />
            </div>
        </div>
    )
}
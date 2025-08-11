import { LuCloudUpload } from "react-icons/lu";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEditor from "../../hooks/useEditor";
import EmployeePhoto from "../../components/EmployeePhoto";

export interface ApiEmp {
    id: string,
    name: string
    email: string
    address: string
    photoId?: string | null 
}

export default function Editor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<ApiEmp>({
        id: '',
        name: '',
        email: '',
        address: '',
        photoId: null
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { atualizarEmp, loading, error } = useEditor();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const removeCurrentPhoto = () => {
        setFormData(prev => ({
            ...prev,
            photoId: null
        }));
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        // Limpar input file
        const fileInput = document.getElementById('upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    useEffect(() => {
        async function carregarEmp() {
            if (!id) {
                console.error("ID não encontrado");
                return;
            }
            
            setIsLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}employee/${id}`);
                if (!res.ok) throw new Error("Erro ao buscar funcionário");
                const data = await res.json();
                
                // Garantir que os dados tenham o formato correto
                setFormData({
                    id: data.id || id,
                    name: data.name || '',
                    email: data.email || '',
                    address: data.address,
                    photoId: data.photoId || null
                });
            } catch (err) {
                console.error("Erro ao carregar funcionário:", err);
            } finally {
                setIsLoading(false);
            }
        }
        carregarEmp();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!id) {
            console.error("ID é obrigatório para editar");
            return;
        }

        setSuccessMessage("");

        try {
            // Garantir que o ID está presente nos dados
            const dataToUpdate = {
                ...formData,
                id: id // Usar o ID da URL
            };

            await atualizarEmp(dataToUpdate, selectedFile);
            
            setSuccessMessage("Funcionário editado com sucesso!");
            
            setTimeout(() => {
                navigate('/home'); // ou para onde você quiser redirecionar
            }, 2000);
            
        } catch (err) {
            console.error("Erro ao editar funcionário:", err);
        }
    };

    // Loading state enquanto carrega os dados
    if (isLoading) {
        return (
            <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-purple-900 min-h-screen">
                <Header />
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="bg-white p-10 rounded-lg shadow-md">
                        <p className="text-purple-700 text-lg">Carregando dados do funcionário...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Se não encontrou o ID
    if (!id) {
        return (
            <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-purple-900 min-h-screen">
                <Header />
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="bg-white p-10 rounded-lg shadow-md">
                        <p className="text-red-700 text-lg">ID do funcionário não encontrado.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-purple-900 min-h-screen">
            <Header />
            <div className="min-h-screen flex items-center justify-center p-4">
                {/* Container com flex */}
                <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl flex gap-10">
                    
                    {/* Formulário */}
                    <form 
                        onSubmit={handleSubmit}
                        className="flex-1"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
                            Editar funcionário
                        </h2>

                        {/* Mensagens de feedback */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                                
                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                {successMessage}
                            </div>
                        )}

                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                            Endereço
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            minLength={6}
                            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-800 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Editando..." : "Editar"}
                        </button>
                    </form>

                    {/* Upload de foto */}  
                    <div className="flex-1 space-y-4">
                        {/* Foto atual */}
                        {formData.photoId && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-700">Foto atual:</h4>
                                <div className="relative group inline-block">
                                    <EmployeePhoto id={formData.id} />
                                    <button
                                        type="button"
                                        onClick={removeCurrentPhoto}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Área de upload */}
                        <label
                            htmlFor="upload"
                            className={`h-[200px] border-2 border-dashed border-purple-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-[#db9ddf] text-[#5c065e] text-sm font-medium text-center p-4 block ${selectedFile ? 'border-green-400 bg-green-50' : ''}`}
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-[#ac63b4] rounded-md mb-4">
                                <LuCloudUpload size={28} />
                            </div>
                            {selectedFile ? 'Nova foto selecionada' : (formData.photoId ? 'Substituir foto atual' : 'Selecionar foto')}
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleUpload}
                            />
                        </label>

                        {/* Nova foto selecionada */}
                        {selectedFile && (
                            <div className="space-y-2">
                                <h4 className="font-semibold text-gray-700">Nova foto:</h4>
                                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">
                                            <span className="text-purple-600 text-xs">IMG</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                                {selectedFile.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeSelectedFile}
                                        className="text-red-500 hover:text-red-700 font-bold text-lg cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Mensagem informativa */}
                        {!formData.photoId && !selectedFile && (
                            <p className="text-xs text-gray-500 text-center">
                                Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
import { LuCloudUpload } from "react-icons/lu";
import Header from "../../components/Header";
import { useState } from "react";
import type { ApiEmp } from "../../hooks/useRegister";
import useRegister from "../../hooks/useRegister";
import usePhotoUp from "../../hooks/usePhotoUp";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState<ApiEmp>({
        name: '',
        email: '',
        address: '',
        photoId: null,
        department: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [employeeId] = useState<string>("");
    const navigate = useNavigate()

    const { registrarEmp, loading, error } = useRegister();
    const { loading: uploadLoading, error: uploadError } = usePhotoUp(employeeId);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files[0])
            setFormData(prev => ({
                ...prev,
                photoId: e.target.files![0]
                }));
        }
    };

    const removeSelectedFile = () => {
        setSelectedFiles(null);
        const fileInput = document.getElementById('upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");

        try {
            await registrarEmp(formData);
            
            setFormData({
                name: "",
                email: "",
                address: "",
                photoId: null,
                department: ""
            });

            setSelectedFiles(null);
            
            const fileInput = document.getElementById('upload') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
            
            setSuccessMessage("Funcionário registrado com sucesso!");
            setTimeout(() => {
                    navigate('/home')
            }, 3000)
            
        } catch (err) {
            console.error("Erro ao registrar funcionário:", err);
        }
    };

  return (
    <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-blue-900 min-h-screen">
        <Header />
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl flex gap-10">
                
                <form onSubmit={handleSubmit} className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                        Registrar funcionário
                    </h2>

                    {(error || uploadError) && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error || uploadError}
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            {successMessage}
                        </div>
                    )}

                    <label htmlFor="name" className="block text-start text-gray-700 font-semibold mb-2">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                     <label htmlFor="email" className="block text-start text-gray-700 font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label htmlFor="address" className="block text-start text-gray-700 font-semibold mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        minLength={2}
                        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                       <label htmlFor="address" className="block text-start text-gray-700 font-semibold mb-2">
                        Setor
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        minLength={2}
                        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                    <button
                        type="submit"
                        disabled={loading || uploadLoading}
                        className="w-full bg-blue-800 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        {(loading || uploadLoading) ? "Salvando..." : "Salvar"}
                    </button>
                </form>

                <div className="flex-1">
                    <label
                        htmlFor="upload"
                        className="h-[250px] mt-15 border-2 border-dashed border-blue-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-[#F5F9FF] text-[#335993] text-sm font-medium text-center p-4"
                    >
                        <div className="w-16 h-16 flex items-center justify-center bg-[#eff4ff] rounded-md mb-4">
                            <LuCloudUpload size={28} />
                        </div>
                        Arraste ou selecione a foto para upload.
                        {selectedFiles && (
                            <div className="mt-2 text-xs text-gray-700">
                                {selectedFiles.name} - {(selectedFiles.size / 1024).toFixed(2)} KB
                            </div>
                        )}
                        <input
                            id="upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                        />
                    </label>

                    {!formData.photoId && !selectedFiles && (
                        <p className="text-xs text-gray-500 text-start mt-2">
                            Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                        </p>
                    )}

                     {selectedFiles && (
                        <div className="space-y-2 mt-4">
                            <h4 className="font-semibold text-gray-700">Foto:</h4>
                            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center">
                                        <span className="text-purple-600 text-xs">IMG</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                            {selectedFiles.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(selectedFiles.size / 1024 / 1024).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <CiCircleRemove
                                    onClick={removeSelectedFile}
                                    className="text-red-500 hover:text-red-700 font-bold text-lg cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}
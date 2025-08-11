import { LuCloudUpload } from "react-icons/lu";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import useRegister from "../../hooks/useRegister";
import { useParams } from "react-router-dom";
import useEditor from "../../hooks/useEditor";

export interface ApiEmp {
    id: string,
    name: string
    email: string
    address: string
}

export default function Editor() {
    const { id } = useParams();

    const [formData, setFormData] = useState<ApiEmp>({
        id: '',
        name: '',
        email: '',
        address: ''
    })
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    const { atualizarEmp, loading, error } = useEditor();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(e.target.files);
        }
    };

    useEffect(() => {
        async function carregarEmp() {
            if (!id) return;
            try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}employee/${id}`);
            if (!res.ok) throw new Error("Erro ao buscar funcionário");
            const data = await res.json();
            setFormData(data);
            } catch (err) {
            console.error(err);
            }
        }
        carregarEmp();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!id) return
        e.preventDefault();
        setSuccessMessage("");

        try {
            await atualizarEmp(formData);
            
            // Limpar formulário após sucesso
            setFormData({
                id: "",
                name: "",
                email: "",
                address: ""
            });
            setSelectedFiles(null);
            
            // Reset do input file
            const fileInput = document.getElementById('upload') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
            
            setSuccessMessage("Funcionário registrado com sucesso!");
            
        } catch (err) {
            console.error("Erro ao registrar funcionário:", err);
        }
    };

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
              required
              minLength={6}
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-800 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition-colors cursor-pointer"
            >
              {loading ? "Editando..." : "Editar"}
            </button>
          </form>

          {/* Upload de fotos */}  
          <label
            htmlFor="upload"
            className="flex-1 h-[320px] border-2 border-dashed border-purple-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-[#db9ddf] text-[#5c065e] text-sm font-medium text-center p-4"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-[#ac63b4] rounded-md mb-4">
              <LuCloudUpload size={28} />
            </div>
            Arraste ou selecione a foto para upload.
            <input
              id="upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

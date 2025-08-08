import { LuCloudUpload } from "react-icons/lu";
import Header from "../../components/Header";

export default function Register() {
  return (
    <div className="text-center p-0 bg-gradient-to-r from-gray-900 to-blue-900 min-h-screen">
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Container com flex para lado a lado */}
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl flex gap-10">
          
          {/* Formulário */}
          <form 
            //onSubmit={handleSubmit}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Registrar funcionário
            </h2>

            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              //value={formData.name}
              //onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              //value={formData.email}
              //onChange={handleChange}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              //value={formData.password}
              //onChange={handleChange}
              required
              minLength={6}
              className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
            >
              Registrar
            </button>
          </form>

          {/* Upload de fotos */}
          <label
            htmlFor="upload"
            className="flex-1 h-[320px] border-2 border-dashed border-blue-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-[#F5F9FF] text-[#335993] text-sm font-medium text-center p-4"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-[#eff4ff] rounded-md mb-4">
              <LuCloudUpload size={28} />
            </div>
            Arraste ou selecione a foto para upload.
            <input
              id="upload"
              type="file"
              multiple
              className="hidden"
              //onChange={handleUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

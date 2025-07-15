import { useState } from "react";
import "./loginstyles.css"


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("")

        if(!email || !senha) {
            setErro("Por favor, preencha todos os campos.")
            setLoading(false)
            return
        }   

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            console.log("Usuário logado: ", {email})
        }, 1500)
    }

    

    return (
        <div className="min-h-screen flex items-center justify-center .gradient-bg-login-animated">
           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Employee Manager</h2>
                {erro && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {erro}
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        E-mail:
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="Digite seu email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="senha" className="block text-sm font-bold text-gray-700 mb-2">Senha:</label>
                    <input 
                        type="senha"
                        id="senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Esqueceu sua senha?
                    </a>
                </div>
           </div>
        </div>
    )
}


export default LoginPage;
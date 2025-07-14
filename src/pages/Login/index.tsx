import { useState } from "react";



const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [erro, setErro] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                {erro && <p>{erro}</p>}
                <p className="text-2xl text-bold">E-mail:</p>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-4 py-2 border rounded" 
                    required
                />
                <p className="text-2xl text-bold">Senha:</p>
                <input 
                    type="password" 
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
            </form>
        </div>
    )
}


export default LoginPage;
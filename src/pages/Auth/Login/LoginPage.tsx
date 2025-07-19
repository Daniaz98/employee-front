import Ellipse  from "../../../assets/login-page/Ellipse.png"
import Ellipse2  from "../../../assets/login-page/Ellipse2.png"


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-8">
      <div className="flex w-full max-w-6xl justify-between items-center gap-8">
        <img src={Ellipse} alt="" className="absolute top-2 right-105 mt-4 mr-4 w-70 h-auto z-0" />
        <img src={Ellipse2} alt="" className="absolute bottom-2 right-17 mt-4 mr-4 w-60 h-auto z-0" />

        {/* Esquerda: Mensagem de boas-vindas */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold">Seja bem-vindo ao <span className="text-purple-400">Employee Manager!</span></h1>
        </div>

        {/* Direita: Formulário */}
        <div className="backdrop-blur-sm bg-white/5 border  from-[#1c1c1c] to-black border-gray-700 p-20 rounded-xl w-full max-w-sm shadow-lg z-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 rounded bg-black border border-gray-600 mb-4"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 rounded bg-black border border-gray-600 mb-6"
          />

          <button className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600">
            Entrar
          </button>

          <p className="text-sm text-center mt-2 cursor-pointer hover:underline">
            Esqueceu a senha?
          </p>

          <div className="my-4 border-t border-gray-600" />

          <div className="mt-6 text-sm text-center">
            <p>
              Não possui uma conta?{" "}
              <span className="text-purple-400 hover:underline cursor-pointer">Registre-se aqui</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

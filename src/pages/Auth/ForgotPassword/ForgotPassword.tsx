import { Link } from "react-router-dom";
import Ellipse  from "../../../assets/forgot-page/Ellipse-forgot-pass.png"
import Ellipse2  from "../../../assets/forgot-page/Ellipse-forgot-pass2.png"


export default function ForgotPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-8">
      <div className="flex w-full max-w-6xl justify-between items-center gap-8">
        <img src={Ellipse} alt="" className="absolute top-2 right-105 mt-4 mr-4 w-70 h-auto z-0" />
        <img src={Ellipse2} alt="" className="absolute bottom-2 right-17 mt-4 mr-4 w-60 h-auto z-0" />

        {/* Esquerda: Mensagem de boas-vindas */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold">Esqueceu a senha?</h1>
          <h1 className="text-5xl font-bold">Sem <span className="text-pink-400">Problemas!</span></h1>
          <p className="mt-4">Utilize seu e-mail para a criação de uma nova senha.</p>
        </div>

        {/* Direita: Formulário */}
        <div className="backdrop-blur-sm bg-white/5 border  from-[#1c1c1c] to-black border-gray-700 p-20 rounded-xl w-full max-w-sm shadow-lg z-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Por favor, insira seu e-mail</h2>

          <input
            type="text"
            placeholder="example@mail.com"
            className="w-full p-2 rounded bg-black border border-gray-600 mb-4"
          />
         
          <button className="w-full py-2 rounded bg-gradient-to-r from-pink-500 to-pink-950">
            Nova senha
          </button>

          <div className="my-4 border-t border-gray-600" />

         <div className="mt-6 text-sm text-center">
            <p>
              Não possui uma conta?{" "}
              <Link to="/signup" className="text-purple-400 hover:underline cursor-pointer">Registre-se aqui</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

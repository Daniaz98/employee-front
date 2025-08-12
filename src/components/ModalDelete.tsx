import { useState } from "react"

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean; 
}


export const ModalDelete: React.FC<ModalDeleteProps> = ({ 
    isOpen, onClose, onConfirm, loading = false}) => {

    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white/10 backdrop-blur-lg backdrop-saturate-150 
                           border border-white/20 p-6 rounded-xl shadow-2xl max-w-sm w-full
                           backdrop-brightness-110">
                <h2 className="text-lg font-bold mb-6 text-white">Confirmar Exclusão</h2>
                <p className="mb-8 text-white/80">Tem certeza que deseja excluir o funcionário?</p>
                <div className="flex justify-center gap-5">
                    <button 
                        className="px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-lg 
                                   hover:bg-red-600/90 transition-all duration-200 border border-red-500/30 cursor-pointer"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </button>
                    <button 
                        className="px-4 py-2 bg-blue-600/80 backdrop-blur-sm rounded-lg text-white 
                                   hover:bg-blue-600/90 transition-all duration-200 border border-blue-500/30 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};
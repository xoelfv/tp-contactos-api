export default function ConfirmDialog({ mostrar, mensaje, onConfirmar, onCancelar }) {
    if (!mostrar) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/0 transition delay-50 duration-200 hover:bg-black/50 flex justify-center items-center p-4">
            <div className="bg-amber-100 text-orange-950 rounded-2xl shadow-2xl p-5 max-w-md w-full">
                <h2 className="text-2xl mb-3">Confirmar accion</h2>

                <p className="mb-5">{mensaje}</p>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onCancelar}
                        className="bg-gray-500 text-white px-4 py-2 rounded-xl"
                    >
                        Cancelar
                    </button>

                    <button 
                        onClick={onConfirmar}
                        className="bg-red-700 text-white px-4 py-2 rounded-xl"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

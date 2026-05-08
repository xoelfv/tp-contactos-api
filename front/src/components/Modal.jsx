export default function Modal({ titulo, children, cerrar }) {
    return (
        <div className="fixed inset-0 z-40 bg-black/0 transition delay-50 duration-200 hover:bg-black/50  flex justify-center items-center p-4 overflow-auto">
            <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl shadow-2xl p-5 w-full max-w-xl">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl text-orange-950 dark:text-amber-100">
                        {titulo}
                    </h2>

                    <button 
                        type="button"
                        onClick={cerrar}
                        className="bg-red-700 text-white px-3 py-1 rounded-xl"
                    >
                        X
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default function Toast({ toast }) {
    if (!toast) return null;

    const color = toast.tipo === "error" 
        ? "bg-red-700" 
        : "bg-green-700";

    return (
        <div className={`fixed top-5 right-5 z-50 ${color} text-white p-4 rounded-xl shadow-xl`}>
            {toast.mensaje}
        </div>
    );
}

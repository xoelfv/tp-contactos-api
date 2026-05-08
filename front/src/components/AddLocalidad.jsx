import { useState } from "react"
// importamos usenavigate para volver al inicio despues de guardar
import { useNavigate } from "react-router" 
import Modal from "./Modal"

// recibimos actualizarlocalidades y mostrarToast
export function AddLocalidad ({actualizarLocalidades, mostrarToast}){
    const navigate = useNavigate()
    const [localidad, setLocalidad] = useState("")
    const [provincia, setProvincia] = useState("")
    const [errores, setErrores] = useState({})

    const validarFormulario = () => {
        const nuevosErrores = {}
        const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/

        if (!regexTexto.test(localidad)) {
            nuevosErrores.localidad = "La localidad debe tener solo letras"
        }

        if (!regexTexto.test(provincia)) {
            nuevosErrores.provincia = "La provincia debe tener solo letras"
        }

        setErrores(nuevosErrores)

        return Object.keys(nuevosErrores).length === 0
    }


    const guardarLocalidad = (e) => {
        // esto frena el comportamiento por defecto del navegador de recargar la pagina cuando se presiona un boton submit, para que pueda actuar la funcion guardarLocalidad en su lugar
        e.preventDefault();

        if (!validarFormulario()) {
            mostrarToast("Revisa los campos marcados", "error")
            return
        }

        // se almacenan los datos en un objeto usando las variables de useState
        const nuevaLocalidad = {
            localidad: localidad,
            provincia: provincia,

        };
        fetch('http://127.0.0.1:5000/localidades/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(nuevaLocalidad) 
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.ok === false) {
                    mostrarToast(data.message || "Error al guardar localidad", "error")
                    return
                }

                actualizarLocalidades(); 
                mostrarToast("Localidad guardada correctamente", "ok")
                navigate("/localidades"); 
            })
            .catch(error => {
                console.error("Error al guardar:", error)
                mostrarToast("No se pudo conectar con el servidor", "error")
            });
    }

    // formulario
    return(
        <Modal titulo="Ingresar datos de localidad" cerrar={() => navigate("/localidades")}>
            <form className="text-orange-950 dark:text-amber-100" onSubmit={guardarLocalidad}>
                <label htmlFor="">Localidad: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="localidad" required value={localidad} onChange={(e)=>setLocalidad(e.target.value)} />
                {errores.localidad && <p className="text-red-700 text-sm">{errores.localidad}</p>}

                <label htmlFor="">Provincia: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="provincia" required value={provincia} onChange={(e)=>setProvincia(e.target.value)} />
                {errores.provincia && <p className="text-red-700 text-sm">{errores.provincia}</p>}
                
                
                <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit" >Guardar</button>                 
            </form>
        </Modal>
    )
}

import { useState, useEffect } from "react"
// useparams para agarrar el id de la url y usenavigate para saltar de url cuando se guarda la localidad editada
import { useParams, useNavigate } from "react-router" 
import Modal from "./Modal"

export function EditarLocalidad ({actualizarLocalidades, mostrarToast}){
    // se extrae el id exacto que react router guardo de la url
    const { id } = useParams() 
    const navigate = useNavigate()
    
    // useStates para el formulario
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


    // fetchea los datos del localidad usando su id
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/localidades/${id}`)
            .then(resp => resp.json())
            .then(data => {
                const localidad = data.data;
                
                setLocalidad(localidad.localidad)
                setProvincia(localidad.provincia)
            })
            .catch(error => console.error("error al cargar la localidad:", error));
    }, [id]) 

    const actualizarLocalidad = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            mostrarToast("Revisa los campos marcados", "error")
            return
        }

        const localidadEditada = {
            localidad: localidad,
            provincia: provincia,
           
        };

        // se hace el fetch pero con el metodo put para actualizar los datos guardados
        fetch(`http://127.0.0.1:5000/localidades/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(localidadEditada)
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.ok === false) {
                mostrarToast(data.message || "Error al actualizar localidad", "error")
                return
            }

            // avisamos a app que pida la lista nueva y volvemos al menu principal
            actualizarLocalidades(); 
            mostrarToast("Localidad actualizada correctamente", "ok")
            navigate("/localidades"); 
        })
        .catch(error => {
            console.error("error al actualizar:", error)
            mostrarToast("No se pudo conectar con el servidor", "error")
        });
    }

    
    return(
        <Modal titulo="Editar localidad" cerrar={() => navigate("/localidades")}>
            <form className="text-orange-950 dark:text-amber-100" onSubmit={actualizarLocalidad}>
                <label htmlFor="">Localidad: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="localidad" required value={localidad} onChange={(e)=>setLocalidad(e.target.value)} />
                {errores.localidad && <p className="text-red-700 text-sm">{errores.localidad}</p>}

                <label htmlFor="">Provincia: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="provincia" required value={provincia} onChange={(e)=>setProvincia(e.target.value)} />
                {errores.provincia && <p className="text-red-700 text-sm">{errores.provincia}</p>}

                
                
                <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit">Guardar cambios</button> 
            </form>
        </Modal>
    )
}

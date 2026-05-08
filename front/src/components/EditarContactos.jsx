import { useState, useEffect } from "react"
// useparams para agarrar el id de la url y usenavigate para saltar de url cuando se guarda el contacto editado
import { useParams, useNavigate } from "react-router" 
import Modal from "./Modal"

export function EditarContacto ({actualizarContactos, mostrarToast}){
    // se extrae el id exacto que react router guardo de la url
    const { id } = useParams() 
    const navigate = useNavigate()
    
    // useStates para el formulario
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [id_localidad, setIdlocalidad] = useState("")
    const [errores, setErrores] = useState({})

    const validarFormulario = () => {
        const nuevosErrores = {}

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/
        const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const regexTelefono = /^\+?[0-9\s\-]{7,20}$/
        const regexDireccion = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\-]{3,50}$/
        const regexNumero = /^[0-9]*$/

        if (!regexNombre.test(nombre)) {
            nuevosErrores.nombre = "El nombre debe tener solo letras y al menos 2 caracteres"
        }

        if (!regexNombre.test(apellido)) {
            nuevosErrores.apellido = "El apellido debe tener solo letras y al menos 2 caracteres"
        }

        if (!regexEmail.test(email)) {
            nuevosErrores.email = "El email no tiene un formato valido"
        }

        if (telefono && !regexTelefono.test(telefono)) {
            nuevosErrores.telefono = "El telefono debe tener entre 7 y 20 numeros"
        }

        if (direccion && !regexDireccion.test(direccion)) {
            nuevosErrores.direccion = "La direccion debe tener entre 3 y 50 caracteres"
        }

        if (id_localidad && !regexNumero.test(id_localidad)) {
            nuevosErrores.id_localidad = "El id de localidad debe ser numerico"
        }

        setErrores(nuevosErrores)

        return Object.keys(nuevosErrores).length === 0
    }

    // fetchea los datos del contacto usando su id
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/contactos/${id}`)
            .then(resp => resp.json())
            .then(data => {
                const contacto = data.data;
                
                setNombre(contacto.nombre)
                setApellido(contacto.apellido)
                setEmail(contacto.email)
                setTelefono(contacto.telefono)
                setDireccion(contacto.direccion)
                setIdlocalidad(contacto.id_localidad)
            })
            .catch(error => console.error("error al cargar el contacto:", error));
    }, [id]) 

    const actualizarContacto = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            mostrarToast("Revisa los campos marcados", "error")
            return
        }

        const contactoEditado = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            direccion: direccion,
            id_localidad: id_localidad
        };

        // se hace el fetch pero con el metodo put para actualizar los datos guardados
        fetch(`http://127.0.0.1:5000/contactos/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactoEditado)
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.ok === false) {
                mostrarToast(data.message || "Error al actualizar contacto", "error")
                return
            }

            // avisamos a app que pida la lista nueva y volvemos al menu principal
            actualizarContactos(); 
            mostrarToast("Contacto actualizado correctamente", "ok")
            navigate("/contactos"); 
        })
        .catch(error => {
            console.error("error al actualizar:", error)
            mostrarToast("No se pudo conectar con el servidor", "error")
        });
    }

    
    return(
        <Modal titulo="Editar contacto" cerrar={() => navigate("/contactos")}>
            <form className="text-orange-950 dark:text-amber-100" onSubmit={actualizarContacto}>
                <label htmlFor="">Nombre: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="nombre" required value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                {errores.nombre && <p className="text-red-700 text-sm">{errores.nombre}</p>}

                <label htmlFor="">Apellido: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="apellido" required value={apellido} onChange={(e)=>setApellido(e.target.value)} />
                {errores.apellido && <p className="text-red-700 text-sm">{errores.apellido}</p>}

                <label htmlFor="">Email: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {errores.email && <p className="text-red-700 text-sm">{errores.email}</p>}

                <label htmlFor="">Telefono: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                {errores.telefono && <p className="text-red-700 text-sm">{errores.telefono}</p>}

                <label htmlFor="">Direccion: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="direccion" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                {errores.direccion && <p className="text-red-700 text-sm">{errores.direccion}</p>}

                <label htmlFor="">Localidad id: </label>
                <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
         w-full" type="text" name="id_localidad" value={id_localidad} onChange={(e)=>setIdlocalidad(e.target.value)}/>
                {errores.id_localidad && <p className="text-red-700 text-sm">{errores.id_localidad}</p>}
                
                
                <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit">Guardar cambios</button> 
            </form>
        </Modal>
    )
}

import { useState } from "react"
// importamos usenavigate para volver al inicio despues de guardar
import { useNavigate } from "react-router" 
import Modal from "./Modal"

// recibimos actualizarcontactos y mostrarToast
export function AddContacto ({actualizarContactos, mostrarToast}){
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")
    const [errores, setErrores] = useState({})

    const validarFormulario = () => {
        const nuevosErrores = {}

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/
        const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const regexTelefono = /^\+?[0-9\s\-]{7,20}$/
        const regexDireccion = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\-]{3,50}$/

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

        setErrores(nuevosErrores)

        return Object.keys(nuevosErrores).length === 0
    }

    const guardarContacto = (e) => {
        // esto frena el comportamiento por defecto del navegador de recargar la pagina cuando se presiona un boton submit, para que pueda actuar la funcion guardarContacto en su lugar
        e.preventDefault();

        if (!validarFormulario()) {
            mostrarToast("Revisa los campos marcados", "error")
            return
        }

        // se almacenan los datos en un objeto usando las variables de useState
        const nuevoContacto = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            direccion: direccion
        };
        fetch('http://127.0.0.1:5000/contactos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(nuevoContacto) 
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.ok === false) {
                    mostrarToast(data.message || "Error al guardar contacto", "error")
                    return
                }

                actualizarContactos(); 
                mostrarToast("Contacto guardado correctamente", "ok")
                navigate("/contactos"); 
            })
            .catch(error => {
                console.error("Error al guardar:", error)
                mostrarToast("No se pudo conectar con el servidor", "error")
            });
    }

    // formulario
    return(
        <Modal titulo="Ingresar datos de contacto" cerrar={() => navigate("/contactos")}>
            <form className="text-orange-950 dark:text-amber-100" onSubmit={guardarContacto}>
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
                
                <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit" >Guardar</button>                 
            </form>
        </Modal>
    )
}

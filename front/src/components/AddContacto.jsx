import { useState } from "react"
// importamos usenavigate para volver al inicio despues de guardar
import { useNavigate } from "react-router" 

// recibimos actualizarcontactos
export function AddContacto ({actualizarContactos}){
    const navigate = useNavigate()
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")

    const guardarContacto = (e) => {
        // esto frena el comportamiento por defecto del navegador de recargar la pagina cuando se presiona un boton submit, para que pueda actuar la funcion guardarContacto en su lugar
        e.preventDefault();

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
                actualizarContactos(); 
                navigate("/"); 
            })
            .catch(error => console.error("Error al guardar:", error));
    }

    // formulario
    return(
        <div className="md:flex p-10 w-full justify-center md:h-dvh">
            <div className="bg-linear-to-br from-[#181412] to-[#2b1b14] rounded-2xl border-2 border-amber-950 shadow-2xl p-4">
                <h2 className='text-4xl text-center p-3'>Ingresar datos de contacto</h2>
                <hr/>
            </div>    
            <div className="bg-linear-to-br from-[#35231a] to-[#422416] rounded-2xl border-2 border-amber-950 shadow-2xl p-4 md:w-dvh">
                <form onSubmit={guardarContacto}>
                    <label htmlFor="">Nombre: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="nombre" required value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                    <label htmlFor="">Apellido: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="apellido" required value={apellido} onChange={(e)=>setApellido(e.target.value)} />
                    <label htmlFor="">Email: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="">Telefono: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                    <label htmlFor="">Direccion: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="direccion" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                    
                    <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit" >Guardar</button>                 
                </form>
            </div>
        </div>
    )
}
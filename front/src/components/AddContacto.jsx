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
        <div style={{textAlign:"left", display:"flex", justifyContent:"space-between", padding:"1rem"}}>
            <div>
                <h2>Ingresar datos de contacto</h2>
                <hr/>
                <form onSubmit={guardarContacto}>
                    <label htmlFor="">Nombre: </label>
                    <input type="text" name="nombre" required value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                    <label htmlFor="">Apellido: </label>
                    <input type="text" name="apellido" required value={apellido} onChange={(e)=>setApellido(e.target.value)} />
                    <label htmlFor="">Email: </label>
                    <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="">Telefono: </label>
                    <input type="text" name="telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                    <label htmlFor="">Direccion: </label>
                    <input type="text" name="direccion" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                    
                    <button type="submit" >Guardar</button>                 
                </form>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react"
// useparams para agarrar el id de la url y usenavigate para saltar de url cuando se guarda el contacto editado
import { useParams, useNavigate } from "react-router" 

export function EditarContacto ({actualizarContactos}){
    // se extrae el id exacto que react router guardo de la url
    const { id } = useParams() 
    const navigate = useNavigate()
    
    // useStates para el formulario
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")

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
            })
            .catch(error => console.error("error al cargar el contacto:", error));
    }, [id]) 

    const actualizarContacto = (e) => {
        e.preventDefault();

        const contactoEditado = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            direccion: direccion
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
        .then(() => {
            // avisamos a app que pida la lista nueva y volvemos al menu principal
            actualizarContactos(); 
            navigate("/"); 
        })
        .catch(error => console.error("error al actualizar:", error));
    }

    
    return(
        <div style={{textAlign:"left", display:"flex", justifyContent:"space-between", padding:"1rem"}}>
            <div>
                <h2>Editar contacto</h2>
                <hr/>
                <form onSubmit={actualizarContacto}>
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
                    
                    <button type="submit">Guardar cambios</button> 
                </form>
            </div>
        </div>
    )
}
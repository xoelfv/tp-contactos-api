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
    const [id_localidad, setIdlocalidad] = useState("")

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
        .then(() => {
            // avisamos a app que pida la lista nueva y volvemos al menu principal
            actualizarContactos(); 
            navigate("/"); 
        })
        .catch(error => console.error("error al actualizar:", error));
    }

    
    return(
        <div className="md:flex p-10 w-full justify-center md:h-dvh">
            <div  className="bg-linear-to-bl from-[#853e1b] to-[#612e14] dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                <h2 className='text-4xl text-center p-3'>Editar contacto</h2>
                <hr/>
            </div>
            <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4 md:w-dvh">                 
                <form className="text-orange-950 dark:text-amber-100" onSubmit={actualizarContacto}>
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
                    <label htmlFor="">Localidad id: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="id_localidad" value={id_localidad} onChange={(e)=>setIdlocalidad(e.target.value)}/>
                    
                    
                    <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit">Guardar cambios</button> 
                </form>
            </div>
        </div>
    )
}
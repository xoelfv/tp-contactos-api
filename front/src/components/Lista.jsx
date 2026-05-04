import { Link } from 'react-router';

function Contactos ({contacto, actualizarContactos}){

    // función para eliminar, verifica selección y fetchea contacto por su id y el metodo delete del back
    const eliminarContacto = (id) => {
        
        const conf = confirm("Esta seguro que desea eliminar el contacto?")
        if(!conf)return
        /* usar comillas invertidas permite inyectar la variable id directamente en la URL */
        fetch(`http://127.0.0.1:5000/contactos/${id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json())
        .then(() => {
            /* se ejecuta la función de actualización para que react vuelva a pedir la lista limpia y el contacto desaparezca de la pantalla al instante */
            actualizarContactos();
        })
        .catch(error => console.error("Error al eliminar:", error));
    }

    // html de la lista que se muestra en inicio
    return  <div style={{
            textAlign:"start",
            display:"flex",
            justifyContent:"space-between",
            padding:"1rem"
    }}> 
        <div>   
            <p><b> Nombre: </b>{contacto.nombre} {contacto.apellido}</p>
            <p><b>Direccion: </b> {contacto.direccion}</p>
            <p><b>Telefono: </b> {contacto.telefono}</p>
            <p><b>Email: </b> {contacto.email}</p>
            
        </div>
        <div>   
            <button onClick={()=>{eliminarContacto(contacto.id)}}>Eliminar</button>
            <button><Link to={`/editar/${contacto.id}`}>Editar</Link></button>
        </div>
    </div>
}

// lista que recorre los contactos filtrados y se los pasa a Contactos para mostrarlos
export default function Lista ({contactos, actualizarContactos}){
    
    return <>
    {contactos.map(contacto=><Contactos  contacto={contacto} actualizarContactos={actualizarContactos}/>)} 
    </>


}
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
    return  <div className='md:flex justify-between p-4 rounded-t-2xl mb-2 bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] shadow-2xl  '> 
                <div className='dark:text-amber-100 text-amber-950 '>   
                    <p><b> Nombre: </b>{contacto.nombre} {contacto.apellido}</p>
                    <p><b>Direccion: </b> {contacto.direccion}</p>
                    <p><b>Telefono: </b> {contacto.telefono}</p>
                    <p><b>Email: </b> {contacto.email}</p>
                    <p><b>Provincia: </b> {contacto.localidad?.provincia}</p>
                    <p><b>Localidad: </b> {contacto.localidad?.localidad}</p>
                    
                </div>
                <div >   
                    <button className='rounded-tl-2xl p-2 bg-linear-to-br from-[#991d0d] to-[#7e1f0f] text-amber-100 text-sm ' onClick={()=>{eliminarContacto(contacto.id)}}>Eliminar</button>
                    <Link to={`/editarContacto/${contacto.id}`} ><button className='rounded-tr-2xl p-2 bg-linear-to-br from-[#427d80] to-[#3b6b7e] text-amber-100 text-sm  '  >Editar</button></Link>
                </div>
             </div>
}

// lista que recorre los contactos filtrados y se los pasa a Contactos para mostrarlos
export default function Lista ({filtro, actualizarContactos, localidades}){
    
    return <>
    {filtro.map(contacto=><Contactos  contacto={contacto} actualizarContactos={actualizarContactos} localidades={localidades}/>)} 
    </>


}


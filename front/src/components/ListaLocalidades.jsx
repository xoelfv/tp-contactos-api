import { Link } from 'react-router';

function Localidades ({localidad, actualizarLocalidades}){

    // función para eliminar, verifica selección y fetchea contacto por su id y el metodo delete del back
    const eliminarLocalidad = (id) => {
        
        const conf = confirm("Esta seguro que desea eliminar la localidad?")
        if(!conf)return
        /* usar comillas invertidas permite inyectar la variable id directamente en la URL */
        fetch(`http://127.0.0.1:5000/localidades/${id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json())
        .then(() => {
            /* se ejecuta la función de actualización para que react vuelva a pedir la lista limpia y el contacto desaparezca de la pantalla al instante */
            actualizarLocalidades();
        })
        .catch(error => console.error("Error al eliminar:", error));
    }

    // html de la lista que se muestra en inicio
    return  <div className='md:flex justify-between p-4 rounded-t-2xl mb-2 bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] shadow-2xl  '> 
                <div className='dark:text-amber-100 text-amber-950 '>   
                    <p><b> Localidad: </b>{localidad.localidad}</p>
                    <p><b>Direccion: </b> {localidad.provincia}</p>
                    
                    
                </div>
                <div >   
                    <button className='rounded-tl-2xl p-2 bg-linear-to-br from-[#991d0d] to-[#7e1f0f] text-amber-100 text-sm ' onClick={()=>{eliminarLocalidad(localidad.id)}}>Eliminar</button>
                    <Link to={`/editarLocalidad/${localidad.id}`} ><button className='rounded-tr-2xl p-2 bg-linear-to-br from-[#427d80] to-[#3b6b7e] text-amber-100 text-sm  '  >Editar</button></Link>
                </div>
             </div>
}

// lista que recorre los contactos filtrados y se los pasa a Contactos para mostrarlos
export default function ListaLocalidades ({filtro, actualizarLocalidades}){
    
    return <>
    {filtro.map(localidad=><Localidades  localidad={localidad} actualizarLocalidades={actualizarLocalidades}/>)} 
    </>


}


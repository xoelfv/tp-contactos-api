import { Link } from 'react-router';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

function Localidades ({localidad, actualizarLocalidades, mostrarToast}){
    const [mostrarDialogo, setMostrarDialogo] = useState(false)

    // función para eliminar, fetchea localidad por su id y el metodo delete del back
    const eliminarLocalidad = () => {
        /* usar comillas invertidas permite inyectar la variable id directamente en la URL */
        fetch(`http://127.0.0.1:5000/localidades/${localidad.id}`, {
            method: 'DELETE',
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.ok === false) {
                mostrarToast(data.message || "Error al eliminar localidad", "error")
                return
            }

            /* se ejecuta la función de actualización para que react vuelva a pedir la lista limpia y la localidad desaparezca de la pantalla al instante */
            actualizarLocalidades();
            mostrarToast("Localidad eliminada correctamente", "ok")
            setMostrarDialogo(false)
        })
        .catch(error => {
            console.error("Error al eliminar:", error)
            mostrarToast("No se pudo conectar con el servidor", "error")
        });
    }

    // html de la lista que se muestra en inicio
    return  <div className='md:flex justify-between p-4 rounded-t-2xl mb-2 bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] shadow-2xl  '> 
                <div className='dark:text-amber-100 text-amber-950 '>   
                    <p><b> Localidad: </b>{localidad.localidad}</p>
                    <p><b> Provincia: </b> {localidad.provincia}</p>
                    
                    
                </div>
                <div >   
                    <button className='rounded-tl-2xl p-2 bg-linear-to-br from-[#991d0d] to-[#7e1f0f] text-amber-100 text-sm ' onClick={()=>setMostrarDialogo(true)}>Eliminar</button>
                    <Link to={`/editarLocalidad/${localidad.id}`} ><button className='rounded-tr-2xl p-2 bg-linear-to-br from-[#427d80] to-[#3b6b7e] text-amber-100 text-sm  '  >Editar</button></Link>
                </div>

                <ConfirmDialog 
                    mostrar={mostrarDialogo}
                    mensaje="Seguro que desea eliminar esta localidad?"
                    onConfirmar={eliminarLocalidad}
                    onCancelar={() => setMostrarDialogo(false)}
                />
             </div>
}

// lista que recorre las localidades filtradas y se las pasa a Localidades para mostrarlas
export default function ListaLocalidades ({filtro, actualizarLocalidades, mostrarToast}){
    
    return <>
    {filtro.map(localidad=><Localidades key={localidad.id} localidad={localidad} actualizarLocalidades={actualizarLocalidades} mostrarToast={mostrarToast}/>)} 
    </>


}

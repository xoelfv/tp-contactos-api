import Busqueda from './Busqueda'
import Lista from './Lista'
import { Link } from 'react-router'; // importamos la herramienta para navegar
import { useState } from "react"


export default function VistaContactos ({contactos, actualizarContactos, mostrarToast}){
    const [filtro, setFiltro] = useState([])
    
    return (
        <><div className="md:flex p-10 w-full justify-center md:h-dvh"  >
                {/*div izquierda, titulo e input*/}
                {/*se importa el componente de búsqueda y de lista para mostrar los contactos filtrados por la busqueda */}
              
                    <div className="bg-linear-to-bl from-[#853e1b] to-[#612e14]   dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                        <h1 className='text-4xl text-center p-3'>BUSCAR CONTACTOS</h1> 
                        <Busqueda contactos={contactos} setFiltro={setFiltro} />
                        
                        <div className='p-8 translate-y-1 transition delay-50 duration-200 ease-in-out hover:translate-y-0'>
                            <Link to="/addContacto" ><button className='  bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl w-full  p-2 border-be-2 border-stone-600'>Añadir contacto</button></Link>
                        </div>
                        <div className='translate-y-1 transition delay-50 duration-200 ease-in-out hover:translate-y-0 p-8  '>
                            <Link to="/" ><button className='  bg-linear-to-br from-[#35231a] to-[#422416] text-amber-100 rounded-t-xl md:w-48 w-24  p-2 border-be-2 border-stone-600'>Volver</button></Link>
                        </div>
                    
                    </div>
             
                 {/*div derecha, lista*/}
                <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl dark:shadow-2xl p-4 md:w-dvh">
                    <div className='p-3'>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                            <h2 className="text-4xl p-2 text-amber-950 dark:text-amber-100">LISTA DE CONTACTOS</h2>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                    </div>
                    
                        <Lista filtro={filtro} actualizarContactos={actualizarContactos} mostrarToast={mostrarToast}/>        
                </div>    
            </div>
        </>
    )
}
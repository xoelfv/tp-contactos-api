import Busqueda from './Busqueda'
import Lista from './Lista'
import { Link } from 'react-router'; // importamos la herramienta para navegar


export default function Inicio ({contactos, setFiltro, filtro, actualizarContactos}){

    
    return (
        <><div className="md:flex p-10 w-full justify-center md:h-dvh"  >
                {/*div izquierda, titulo e input*/}
                {/*se importa el componente de búsqueda y de lista para mostrar los contactos filtrados por la busqueda */}
              
                    <div className="bg-linear-to-bl from-[#853e1b] to-[#612e14]   dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                        <h1 className='text-4xl text-center p-3'>LIBRETA DE CONTACTOS</h1> 
                        <Busqueda contactos={contactos} setFiltro={setFiltro} />
                        
                        <div className='p-8 md:justify-start mx-auto'>
                                <button >
                                    <Link to="/add" className='  bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl w-full mx-auto p-2 border-be-2 border-stone-600'>Añadir contacto</Link>
                                </button>
                        </div>
                    
                    </div>
             
                 {/*div derecha, lista*/}
                <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl dark:shadow-2xl p-4 md:w-dvh">
                    <div className='p-3'>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                            <h2 className="text-4xl p-2 text-amber-950 dark:text-amber-100">LISTA DE CONTACTOS</h2>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                    </div>
                    
                        <Lista contactos={filtro} actualizarContactos={actualizarContactos}/>        
                </div>    
            </div>
        </>
    )
}
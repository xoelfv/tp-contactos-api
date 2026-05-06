import Busqueda from './Busqueda'
import Lista from './Lista'
import { Link } from 'react-router'; // importamos la herramienta para navegar

export default function Inicio ({contactos, setFiltro, filtro, actualizarContactos}){
    
    return (
        <><div className="md:flex p-10 w-full justify-center md:h-dvh"  >
                {/*div izquierda, titulo e input*/}
                {/*se importa el componente de búsqueda y de lista para mostrar los contactos filtrados por la busqueda */}
                <div className="bg-linear-to-br from-[#181412] to-[#2b1b14] rounded-2xl border-2 border-amber-950 shadow-2xl p-4">
                    <h1 className='text-4xl text-center p-3'>LIBRETA DE CONTACTOS</h1> 
                    <Busqueda contactos={contactos} setFiltro={setFiltro} />
                    
                    <div className='p-8 md:justify-start'>
                            <button >
                                <Link to="/add" className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mx-auto p-2'>Añadir contacto</Link>
                            </button>
                    </div>
                </div>
                 {/*div derecha, lista*/}
                <div className="bg-linear-to-br from-[#35231a] to-[#422416] rounded-2xl border-2 border-amber-950 shadow-2xl p-4 md:w-dvh">
                    <div className='p-3'>
                        <hr/>
                            <h2 className="text-4xl p-2">LISTA DE CONTACTOS</h2>
                        <hr/>
                    </div>

                        <Lista contactos={filtro} actualizarContactos={actualizarContactos}/>        
                </div>    
            </div>
        </>
    )
}
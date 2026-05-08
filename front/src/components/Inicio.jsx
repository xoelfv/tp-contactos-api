
import { Link } from 'react-router'; // importamos la herramienta para navegar




export default function Inicio ({contactos, localidades}){

    
    return (
        <><div className="md:flex p-10 w-full justify-center md:h-dvh"  >
                {/*div izquierda, titulo e input*/}
                {/*se importa el componente de búsqueda y de lista para mostrar los contactos filtrados por la busqueda */}
              
                    <div className="md:max-w-md bg-linear-to-bl from-[#853e1b] to-[#612e14]   dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                        <h1 className='text-4xl md:text-6xl text-center p-7'>LIBRETA DE CONTACTOS</h1> 
                        <hr className='p-2 md:m-4 m-2'/>
                        
                        
                        <div className='md:p-11 p-4 md:justify-start '>
                                <button >
                                    <Link to="/contactos" className='  bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] text-orange-950 rounded-t-2xl md:text-3xl text-2xl md:px-20 px-14 md:p-3 p-1 border-be-2 border-stone-600'><u>C</u>ontactos</Link>
                                </button>
                        </div>
                        <div className='md:p-11 p-4 md:justify-start '>
                                <button >
                                    <Link to="/localidades" className='  bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] text-orange-950 rounded-t-2xl md:text-3xl text-2xl md:px-16 px-10 md:p-3 p-1 border-be-2 border-stone-600'><u>L</u>ocalidades</Link>
                                </button>
                        </div>
                    
                    </div>
             
                 {/*div derecha, lista*/}
                <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl dark:shadow-2xl p-4 md:w-dvh">
                    <div className='p-3'>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                            <h2 className="text-4xl p-2 text-amber-950 dark:text-amber-100">RESUMEN</h2>
                        <hr className='text-amber-950 dark:text-amber-100 '/>
                    </div>
                    <div>
                        <b>
                            <p className="md:text-4xl text-2xl md:p-10 p-4 text-amber-950 dark:text-amber-100">CANTIDAD DE CONTACTOS: <t> {contactos.length} </t></p>
                        </b>
                    </div>
                    <div>
                        <b>
                            <p className="md:text-4xl text-2xl md:p-10 p-4 text-amber-950 dark:text-amber-100">CANTIDAD DE LOCALIDADES:<t> {localidades.length} </t> </p>
                        </b>
                    </div>
                    
                               
                </div>    
            </div>
        </>
    )
}
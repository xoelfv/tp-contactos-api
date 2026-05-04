import Busqueda from './Busqueda'
import Lista from './Lista'
import { Link } from 'react-router'; // importamos la herramienta para navegar

export default function Inicio ({contactos, setFiltro, filtro, actualizarContactos}){
    
    return (
        <>
          <h1>LIBRETA DE CONTACTOS</h1>
           
           {/*se importa el componente de búsqueda y de lista para mostrar los contactos filtrados por la busqueda */}
          <Busqueda contactos={contactos} setFiltro={setFiltro} />
            
          <div style={{ textAlign: "start" }}>
               <hr/>
                   <h2>LISTA DE CONTACTOS</h2>
               <hr/>
           </div>
           <div style={{textAlign:"start", justifyContent:"space-between", padding:"1rem"}}>
                <button>
                    <Link to="/add">Añadir contacto</Link>
                </button>
            </div>
          
            
            
            <Lista contactos={filtro} actualizarContactos={actualizarContactos}/>        
        </>
    )
}
import { useEffect, useState } from "react" 


export default function Busqueda({contactos, setFiltro}){
    const [text, setText] = useState("")

    // filtro que selecciona de contactos aquellos que incluyan lo ingresado por el input
    useEffect(()=>{
        if (!contactos) return;
        const lowtext=text.toLowerCase()
        setFiltro(contactos.filter(contacto=>{
            console.warn(contacto)
            return contacto.nombre.toLowerCase().includes(lowtext) || contacto.apellido.toLowerCase().includes(lowtext)
        }
        ))
    
    }, [text, contactos])

    // input de búsqueda con el onchange que detecta las teclas ingresadas, y las carga en la memoria de react para que sean visibles en la caja de texto
    return (<>
        <h2>BÚSQUEDA</h2>
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)} />
       
    
    </>)

}
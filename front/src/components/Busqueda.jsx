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
        
        <div class="p-6 max-w-md mx-auto ">
            <label for="input" class=" text-amber-50 mb-2">Nombre o apellido</label>
            <input type="text" id="input" placeholder="Ingresa nombre o apellido del contacto" 
            className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full"
            value={text} onChange={(e)=> setText(e.target.value)} />
       </div>
    
    </>)

}
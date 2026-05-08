import { useEffect, useState } from "react" 


export default function Busqueda({localidades, setFiltro}){
    const [text, setText] = useState("")
    

    // filtro que se ejecuta cuando cambia el input o la lista de contactos y selecciona de contactos aquellos que incluyan lo ingresado en el input
    useEffect(()=>{
        if (!localidades) return;
        const lowtext=text.toLowerCase()
        setFiltro(localidades.filter(localidad=>{
            console.warn(localidad)
            return localidad.localidad.toLowerCase().includes(lowtext) || localidad.provincia.toLowerCase().includes(lowtext)
        }
        ))
    
    }, [text, localidades])

    // input de búsqueda con el onchange que detecta las teclas ingresadas, y las carga en la memoria de react para que sean visibles en la caja de texto
    return (<>
        
        <div class="p-6 max-w-md mx-auto ">
            <label for="input" class=" text-amber-100 mb-2">Localidad o provincia</label>
            <input type="text" id="input" placeholder="Ingresa localidad o provincia del contacto" 
            className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full border-be-2 border-stone-600"
            value={text} onChange={(e)=> setText(e.target.value)} />
       </div>
    
    </>)

}
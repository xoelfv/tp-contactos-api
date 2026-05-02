import { useState } from "react"

export function ModoOscuro(){

    const [oscuro, setOscuro] = useState(false);

    return (<>  
        
        <button onClick={()=> setOscuro((estadoAnterior)=> !estadoAnterior)}> "Modo Oscuro" </button>
      
    </>)
}
import { useState } from "react"

export function Contador(){
    const [contador, setContador] = useState(0);

    return (<>
    <div style={{display:"flex"}}>
        <h4>Contador Jijo --------------------------------------------- </h4>
        <button onClick={()=> setContador((old_contador)=> old_contador+1)}>+{contador}</button>
        <button onClick={()=> setContador(0)}>Reset</button>
        

    </div>
    </>)

}
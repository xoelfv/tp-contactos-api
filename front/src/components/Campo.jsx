import { useState } from "react"

export function Campo(){
    const [text, setText] = useState("");
    const [text2, setText2]=useState("");
    const [text3, setText3]=useState("");
    const [text4, setText4]=useState("");
    const [text5, setText5]=useState("");
    const [text6, setText6]=useState("");
    
    //useEffect(()=>{setText2(text)},[text]);

    return (<>
    <h2>Nombre:</h2>
    <input type="text" onChange={(e)=> setText(e.target.value)} value={text}/>
    
    <h2>Apellido: </h2>
    <input type="text" onChange={(e)=> setText2(e.target.value)} value={text2}/>
    
    <h2>Email: </h2>
    <input type="text" onChange={(e)=> setText3(e.target.value)} value={text3}/>
    
    <h2>Telefono: </h2>
    <input type="text" onChange={(e)=> setText4(e.target.value)} value={text4}/>
    
    <h2>Dirección: </h2>
    <input type="text" onChange={(e)=> setText5(e.target.value)} value={text5}/>
        
    <h2>Localidad: </h2>
    <input type="text" onChange={(e)=> setText6(e.target.value)} value={text6}/>
    
    
   </>)
}
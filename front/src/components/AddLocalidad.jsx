import { useState } from "react"
// importamos usenavigate para volver al inicio despues de guardar
import { useNavigate } from "react-router" 

// recibimos actualizarlocalidades
export function AddLocalidad ({actualizarLocalidades}){
    const navigate = useNavigate()
    const [localidad, setLocalidad] = useState("")
    const [provincia, setProvincia] = useState("")


    const guardarLocalidad = (e) => {
        // esto frena el comportamiento por defecto del navegador de recargar la pagina cuando se presiona un boton submit, para que pueda actuar la funcion guardarLocalidad en su lugar
        e.preventDefault();

        // se almacenan los datos en un objeto usando las variables de useState
        const nuevaLocalidad = {
            localidad: localidad,
            provincia: provincia,

        };
        fetch('http://127.0.0.1:5000/localidades/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(nuevaLocalidad) 
            })
            .then(resp => resp.json())
            .then(data => {
                actualizarLocalidades(); 
                navigate("/"); 
            })
            .catch(error => console.error("Error al guardar:", error));
    }

    // formulario
    return(
        <div className="md:flex p-10 w-full justify-center md:h-dvh">
            <div className="bg-linear-to-bl from-[#853e1b] to-[#612e14] dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                <h2 className='text-4xl text-center p-3'>Ingresar datos de localidad</h2>
                <hr/>
            </div>    
            <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4 md:w-dvh">
                <form className="text-orange-950 dark:text-amber-100" onSubmit={guardarLocalidad}>
                    <label htmlFor="">Localidad: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="localidad" required value={localidad} onChange={(e)=>setLocalidad(e.target.value)} />
                    <label htmlFor="">Provincia: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="provincia" required value={provincia} onChange={(e)=>setProvincia(e.target.value)} />
                    
                    
                    <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit" >Guardar</button>                 
                </form>
            </div>
        </div>
    )
}
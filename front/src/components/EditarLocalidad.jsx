import { useState, useEffect } from "react"
// useparams para agarrar el id de la url y usenavigate para saltar de url cuando se guarda la localidad editada
import { useParams, useNavigate } from "react-router" 

export function EditarLocalidad ({actualizarLocalidades}){
    // se extrae el id exacto que react router guardo de la url
    const { id } = useParams() 
    const navigate = useNavigate()
    
    // useStates para el formulario
    const [localidad, setLocalidad] = useState("")
    const [provincia, setProvincia] = useState("")


    // fetchea los datos del localidad usando su id
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/localidades/${id}`)
            .then(resp => resp.json())
            .then(data => {
                const localidad = data.data;
                
                setLocalidad(localidad.localidad)
                setProvincia(localidad.provincia)
            })
            .catch(error => console.error("error al cargar la localidad:", error));
    }, [id]) 

    const actualizarLocalidad = (e) => {
        e.preventDefault();

        const localidadEditada = {
            localidad: localidad,
            provincia: provincia,
           
        };

        // se hace el fetch pero con el metodo put para actualizar los datos guardados
        fetch(`http://127.0.0.1:5000/localidades/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(localidadEditada)
        })
        .then(resp => resp.json())
        .then(() => {
            // avisamos a app que pida la lista nueva y volvemos al menu principal
            actualizarLocalidades(); 
            navigate("/"); 
        })
        .catch(error => console.error("error al actualizar:", error));
    }

    
    return(
        <div className="md:flex p-10 w-full justify-center md:h-dvh">
            <div  className="bg-linear-to-bl from-[#853e1b] to-[#612e14] dark:bg-linear-to-br dark:from-[#181412] dark:to-[#2b1b14] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4">
                <h2 className='text-4xl text-center p-3'>Editar localidad</h2>
                <hr/>
            </div>
            <div className="bg-linear-to-br from-[#fcd7a6] to-[#ddb47f] dark:bg-linear-to-br dark:from-[#35231a] dark:to-[#422416] rounded-2xl border-2 dark:border-amber-950 shadow-2xl p-4 md:w-dvh">                 
                <form className="text-orange-950 dark:text-amber-100" onSubmit={actualizarLocalidad}>
                    <label htmlFor="">Localidad: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="localidad" required value={localidad} onChange={(e)=>setLocalidad(e.target.value)} />
                    <label htmlFor="">Provincia: </label>
                    <input className="rounded-t-xl p-2 focus:outline-none bg-linear-to-r from-amber-100 to-amber-50 text-orange-950  
             w-full" type="text" name="provincia" required value={provincia} onChange={(e)=>setProvincia(e.target.value)} />

                    
                    
                    <button className='bg-linear-to-r from-lime-400 to-lime-300 text-orange-950 rounded-t-xl mt-4 p-2 ' type="submit">Guardar cambios</button> 
                </form>
            </div>
        </div>
    )
}
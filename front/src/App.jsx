import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Inicio from './components/Inicio'
import { AddContacto } from './components/AddContacto';
import { useState, useEffect } from 'react';
import { EditarContacto } from './components/EditarContactos';
import VistaContactos from './components/VistaContactos';
import VistaLocalidades from './components/VistaLocalidades';
import { EditarLocalidad } from './components/EditarLocalidad';
import { AddLocalidad } from './components/AddLocalidad';
import Toast from './components/Toast';

function App() {
    const [contactos, setContactos] = useState([])

    const [isDark, setDark] = useState(false)
    const [localidades, setLocalidades] = useState([])
    const [toast, setToast]=useState(null)
   
    const toggleTheme = () => {
      setDark(!isDark)
    }

    const mostrarToast = (mensaje, tipo = "ok") => {
        setToast({
            mensaje: mensaje,
            tipo: tipo
        })

        setTimeout(() => {
            setToast(null)
        }, 3000)
    }

    const actualizarContactos = ()=>{
        fetch('http://127.0.0.1:5000/contactos/')
        .then(resp=>resp.json())
        .then(data => setContactos(data.data))
    } 
    const actualizarLocalidades = ()=>{
        fetch('http://127.0.0.1:5000/localidades/')
        .then(resp=>resp.json())
        .then(data => setLocalidades(data.data))
    } 
    

    useEffect(actualizarLocalidades,[])
    useEffect(actualizarContactos,[])
  
  return (
    <>
    <div className={isDark ? "dark" : ""}>
      <div className='  min-h-screen bg-linear-to-br from-[#fff8ea] to-[#eed8b8] dark:bg-linear-to-br dark:from-[#49200e] dark:to-[#472111] text-amber-100  font-spacemono md:text-lg '>
        <Toast toast={toast}/>
          <Router>
            <div className='p-8 md:w-64 w-32 place fixed top-2.5 right-1'>
              <button onClick={toggleTheme} className='bg-linear-to-bl from-[#853e1b] to-[#612e14] p-2 rounded-t-xl dark:bg-linear-to-br dark:from-[#3a2f2a] dark:to-[#443026] border-be-2 border-stone-600 text-amber-200  '>Cambiar tema</button>
          </div>
            <Routes> {/* se definen las rutas y se le asigna a cada una el componente correspondiente */}
              <Route path="/" element={<Inicio contactos={contactos} localidades={localidades}/>}/>
              <Route path="/contactos" element={<VistaContactos contactos={contactos} actualizarContactos={actualizarContactos} mostrarToast={mostrarToast} />}/>
              <Route path="/localidades" element={<VistaLocalidades localidades={localidades} actualizarLocalidades={actualizarLocalidades} mostrarToast={mostrarToast} />}/>
              <Route path="/addContacto" element={<AddContacto actualizarContactos={actualizarContactos} mostrarToast={mostrarToast}/>}/>
              <Route path="/addLocalidad" element={<AddLocalidad actualizarLocalidades={actualizarLocalidades} mostrarToast={mostrarToast}/>}/>
              <Route path="/editarContacto/:id" element={<EditarContacto actualizarContactos={actualizarContactos} mostrarToast={mostrarToast}/>}/>
              <Route path="/editarLocalidad/:id" element={<EditarLocalidad actualizarLocalidades={actualizarLocalidades} mostrarToast={mostrarToast}/>}/>
            </Routes>
          </Router>
      </div>    
    </div>
    </>
  )
}

export default App
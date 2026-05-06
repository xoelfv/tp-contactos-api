import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Inicio from './components/Inicio'
import { AddContacto } from './components/AddContacto';
import { useState, useEffect } from 'react';
import { EditarContacto } from './components/EditarContactos';

function App() {
    const [contactos, setContactos] = useState([])
    const [filtro, setFiltro] = useState([])
   
    const actualizarContactos = ()=>{
        fetch('http://127.0.0.1:5000/contactos/')
        .then(resp=>resp.json())
        .then(data => setContactos(data.data))
    } 

    useEffect(actualizarContactos,[])
  
  return (
    <><div className=' min-h-screen bg-linear-to-br from-[#49200e] to-[#472111] text-amber-50  font-spacemono md:text-lg'>
        <Router>
          <Routes> {/* se definen las rutas y se le asigna a cada una el componente correspondiente */}
            <Route path="/" element={<Inicio contactos={contactos} setFiltro={setFiltro} filtro={filtro} actualizarContactos={actualizarContactos}/>}/>
            <Route path="/add" element={<AddContacto actualizarContactos={actualizarContactos}/>}/>
            <Route path="/editar/:id" element={<EditarContacto actualizarContactos={actualizarContactos}/>}/>
          </Routes>
        </Router>
    </div>
    </>
  )
}

export default App
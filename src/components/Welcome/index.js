import React from 'react'
import './welcome.css'
export default function index({createFiles}) {

  return (
    <div className='welcome'>
        <h1 className='h1 welcome-title'>Bienvenido/a</h1>
        <button className='btn btn-primary welcome-btn' onClick={()=> createFiles(true)}>Crear un paquete nuevo de afiliaciones !</button>
    </div>
  )
}

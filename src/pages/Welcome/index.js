import React from 'react'
import { Link } from 'react-router-dom'
import './welcome.css'
import { useUser } from '../../context/userContext'
import Logout from '../../components/LogoutButton'
export default function Index() {
  const {saveTemporalToken,localStorageToken} = useUser()
  const {username} =  saveTemporalToken || localStorageToken
  return (
    <div className='welcome'>
        <h1 className='h1 text-center'>Bienvenido/a {username}</h1>
        <Link to='/new-form'>
          <button className='btn btn-primary h1'>Crear un paquete nuevo de afiliaciones!</button>
        </Link>
        <Link to='/generate-excel'>
          <button className='btn btn-success h1'>Descargar un reporte de afiliaciones!</button>
        </Link>
        <Link to='/generate-week-report'>
          <button className='btn btn-warning h1'>Cantidad afiliciones semanales!</button>
        </Link>
        <Logout/>
    </div>
  )
}
import React,{useRef, useState} from 'react'
import {useUser} from '../../context/userContext'
import {Link} from 'react-router-dom'
import Modal from '../../components/Modal'
import {loginService} from '../../services/userServices'
import Spinner from '../../components/Spinner'

import './login.css'
export default function Index() {

    const [checked, setChecked] = useState(false)
    const [userData,setUserData] = useState('')
    const [password,setPassword] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginMsg, setLoginMsg] = useState('')
    const { setLocalStorageToken, setSaveTemporalToken } = useUser()
    const botonModal = useRef(null)
    const [modalIfo,setModalInfo] = useState(false)
    const [titleMsg,setTitleMsg] = useState('')

    const handleCheckboxChange = e => {
        setChecked(e.target.checked)
      }
    
      const onSubmit = async (e,data) => {
        e.preventDefault()
        const {userData,password} = data
        if (data && userData && password) {
          setDisableButton(true)
          setLoading(true)
          const req = await loginService(data)
          if (req.ok) {
            const res = await req.json()
            if (checked) {
              setLocalStorageToken(res)
            } else {
              setSaveTemporalToken(res)
            }
          } else {
            const error = await req.json()
            setModalInfo(true)
            setLoading(false)
            setLoginMsg(error.error)
            setTitleMsg('Hubo un Error!')
            setDisableButton(false)
            setUserData('')
            setPassword('')
            botonModal.current.click()
            
          }
        }else{
            setModalInfo(true)
            setTitleMsg('Hubo un Error!')
            setLoginMsg('Llena todos los campos solicitados!')
            botonModal.current.click()
        }
      }
    return (
        <div className='login-box'>
            <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
            <Modal  setModalInfo={setModalInfo} modalIformativo={modalIfo} titleModal={titleMsg} bodyModal={loginMsg} />
            <form classNameName='form-login'>
                <h1 className='h1 text-center'>Iniciar Sesion</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electronico</label>
                    <input onChange={(e) => setUserData(e.target.value)} value={userData} placeholder='ej. empresa123@hotmail.com' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} placeholder='Contraseña' type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input onChange={(e)=>handleCheckboxChange(e)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">No cerrar sesion</label>
                </div>
                <div className='text-center'>
                    <button disabled={disableButton} onClick={(e)=>onSubmit(e,{userData,password})} className="btn btn-primary mb-2 col-md-12">
                            {<Spinner loading={loading} title={'Ingresar'}/>}
                        </button>
                    <Link to='/sign-up'>Crear una nuevo cuenta!</Link>
                </div>
            </form>
        </div>
    )
}

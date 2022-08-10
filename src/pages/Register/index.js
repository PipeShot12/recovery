import React, { useRef, useState } from 'react'
import './register.css'
import { Link, useHistory } from 'react-router-dom'
import { registerService } from '../../services/userServices'
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
// const REXEMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
export default function Index() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [registerMsg, setRegisterMsg] = useState('')
    const [titleMsg, setTitleMsg] = useState('')
    // const [isSuccessRegister,setIsSuccessRegister] = useState(false)
    const [aceptarAdvertencia, setAceptarAdvertencia] = useState(false)
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false)
    const [modalIfo, setModalInfo] = useState(false)
    const botonModal = useRef(null)
    const onSubmit = async (e, data) => {
        e.preventDefault()
        const { name, email, password, confirmation } = data
        if (data && name && email && password && confirmation) {
            setDisableButton(true)
            setLoading(true)
            const req = await registerService(data)
            if (req.ok) {
                setLoading(false)
                setModalInfo(true);
                setTitleMsg('Registro Exitoso')
                setMostrarAdvertencia(true)
                setRegisterMsg('Tu registro fue completado espera que el administrador acepte tu solicitud!')
                // setIsSuccessRegister(true)
                botonModal?.current?.click()
                // setTimeout(() => {
                //     history.push('/sign-in')
                //     setModalInfo(false)
                // }, 8000)
            } else {
                const error = await req.json()
                setLoading(false)
                setModalInfo(true)
                setConfirmation('')
                setPassword('')
                setEmail('')
                setName('')
                setTitleMsg('Opps hubo un error!')
                setRegisterMsg(error.error)
                botonModal?.current?.click()
                setDisableButton(false)

            }
        } else {
            setModalInfo(true)
            setTitleMsg('Hubo un Error!')
            setRegisterMsg('Llena todos los campos solicitados!')
            botonModal.current.click()
        }

    }
    const handlerAdvertencia = (data) => {
        setAceptarAdvertencia(data)
        setMostrarAdvertencia(false)
    }
    if (aceptarAdvertencia) {
        
        setModalInfo(false)
        setAceptarAdvertencia(false)
        setMostrarAdvertencia(false)
        setTimeout(()=>history.push('/sign-in'),10)
    }
    return (
        <div className='register-box'>
            <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
            <Modal handlerAdvertencia={handlerAdvertencia} advertencia={mostrarAdvertencia} setModalInfo={setModalInfo} modalIformativo={modalIfo} titleModal={titleMsg} bodyModal={registerMsg} />
            <form>
                <h1 className='h1 text-center'>Registrarse</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electronico</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ej. empresa123@hotmail.com' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Nombre de Usuario</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder='ej. hector' type="text" className="form-control" id="userName" aria-describedby="userHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPasswordConfirm" className="form-label">Confirmacion Contraseña</label>
                    <input value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder='Confirmacion Contraseña' type="password" className="form-control" id="exampleInputPasswordConfirm" />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">No cerrar sesion</label>
                </div> */}
                <div className='text-center'>
                    <button disabled={disableButton} onClick={(e) => onSubmit(e, { name, email, password, confirmation })} className="btn btn-primary mb-2 col-md-12"> {<Spinner loading={loading} title={'Registrarse'} />}</button>
                    <div className='col-md-12'>
                        <Link to='/sign-in'>Ya tengo una cuenta!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
import React, { useRef, useState,useEffect } from 'react'
import Modal from '../../components/Modal'
import {reportLog } from '../../services/logServices'
import { useUser } from '../../context/userContext'
import Spinner from '../../components/Spinner'
import './report-week.css'
import {reportExcel} from '../../services/excelServices'

export default function Index() {
    const { localStorageToken, saveTemporalToken } = useUser()
    const { token } = localStorageToken || saveTemporalToken
    const [disabledButtonGetFilter,setDisabledButtonGetFilter] = useState(false)
    const [loadingGetFilter,setLoadingGetFilter] = useState(false)
    const [msg,setMsg] = useState('')
    const botonModal = useRef(null)
    const [modalIfo, setModalInfo] = useState(false)
    const [titleMsg, setTitleMsg] = useState('')
    const [filtrar, setFiltrar] = useState(false)
    const [rango,setRango] = useState({desde:'',hasta:''})
    useEffect(() => {
      if(filtrar === false) {
        setRango({desde:'',hasta:''})
      }
    }, [filtrar])
    
  
    const handlerInputs = (e) => {
      const valor = e.target.value
      const id = e.target.id
      if(id === 'rangoInf'){
        setRango(prev=>({...prev,desde:valor}))
      }
      if(id === 'rangoSup'){
        setRango(prev => ({...prev,hasta:valor}))
      }
    }
    const filterSearch = async (props,token,e) => {
      e.preventDefault()
      const REXP= /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
      const {range} = props
      
      setFiltrar(false)
      if ((token && range) && (range?.hasta > range?.desde) && (REXP.test(range?.hasta) && (REXP.test(range?.desde)))) {
        setDisabledButtonGetFilter(true)
        setLoadingGetFilter(true)
        
        const req = await reportLog(props,token)
        if (req.ok) {
          const res = await req.json()
          reportExcel(res,range)
          setDisabledButtonGetFilter(false)
          setLoadingGetFilter(false)
        
        } else {
          const error = await req.json()
          setModalInfo(true)
          setLoadingGetFilter(false)
          setMsg(error.error)
          setTitleMsg('Hubo un Error!')
          setDisabledButtonGetFilter(false)
          botonModal.current.click()
  
        }
      }else if ((token && range) && !REXP.test(range.desde) && !REXP.test(range.hasta)){
        setModalInfo(true)
        setLoadingGetFilter(false)
        setMsg("Ingresa las fechas")
        setTitleMsg('Hubo un Error!')
        setDisabledButtonGetFilter(false)
        botonModal.current.click()
      }
    }
  
    return (
      <div className='report-box'>
        <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
        <Modal setModalInfo={setModalInfo} modalIformativo={modalIfo} titleModal={titleMsg} bodyModal={msg} />
  
        <h1 className='h1 text-center'>Generar Reporte</h1>
        <button onClick={() => setFiltrar(prev => !prev)} className='btn btn-warning h1'>Generar reporte filtrado</button>
        {filtrar &&
          <form className='form-report'>
            <div className="mb-3">
              <label  className="form-label">Rango de fechas</label>
              <input onChange={(e) => handlerInputs(e)} value={rango?.desde} placeholder='ej. 1' type="date" className="form-control mb-3" id="rangoInf" aria-describedby="rangoHelp" />
              <input onChange={(e) => handlerInputs(e)} value={rango?.hasta} placeholder='ej. 10' type="date" className="form-control" id="rangoSup" aria-describedby="rangoHelp" />
            </div>
            <div className='d-flex justify-content-center d-md-12'>
            <button disabled={disabledButtonGetFilter} onClick={(e) => filterSearch({range:rango},token,e) } className="btn btn-primary mb-2 ">
              {<Spinner loading={loadingGetFilter} title={'Aceptar'} />}
            </button>
            </div>
          </form>}
      </div>
    )
}

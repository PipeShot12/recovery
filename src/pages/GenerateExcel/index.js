import React, { useRef, useState,useEffect } from 'react'
import Modal from '../../components/Modal'
import { getAllLogs,filterData } from '../../services/logServices'
import { useUser } from '../../context/userContext'
import Spinner from '../../components/Spinner'
import './generate.css'
import {getAllLogsToExcel,getFilterLogsToExcel} from '../../services/excelServices'

export default function Index() {
  const { localStorageToken, saveTemporalToken } = useUser()
  const { token } = localStorageToken || saveTemporalToken
  const [disabledButtonGetAll, setDisabledButtonGetAll] = useState(false)
  const [disabledButtonGetFilter,setDisabledButtonGetFilter] = useState(false)
  const [loadingGetAll,setLoadingGetAll] = useState(false)
  const [loadingGetFilter,setLoadingGetFilter] = useState(false)
  const [msg,setMsg] = useState('')
  const botonModal = useRef(null)
  const [modalIfo, setModalInfo] = useState(false)
  const [titleMsg, setTitleMsg] = useState('')
  const [filtrar, setFiltrar] = useState(false)
  const [porId, setPorId] = useState('');
  const [porFecha, setPorFecha] = useState('')
  useEffect(() => {
    if(filtrar === false) {
      setPorFecha('')
      setPorId('')
    }
  }, [filtrar])
  

  const handlerInputs = (e) => {
    const valor = e.target.value
    const id = e.target.id
    if (id === 'filtrarPorId') {

      setPorId(valor)
      setPorFecha('')
    }
    if (id === 'filtrarPorFecha') {
      setPorId('')
      setPorFecha(valor)
    }
  }

  const filterSearch = async (props,token) => {

    const {id,date} = props
    if (token || id || date) {
      setDisabledButtonGetFilter(true)
      setLoadingGetFilter(true)
      const req = await filterData(props,token)
      if (req.ok) {
        const res = await req.json()
        getFilterLogsToExcel(res)
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
    }
  }

 const generateAllLogs = async (e) => {
    e.preventDefault()

    if (token) {
      setDisabledButtonGetAll(true)
      setLoadingGetAll(true)
      const req = await getAllLogs(token)
      if (req.ok) {
        const res = await req.json()
        getAllLogsToExcel(res)
        setDisabledButtonGetAll(false);
        setLoadingGetAll(false)
      } else {
        const error = await req.json()
        setModalInfo(true)
        setLoadingGetAll(false)
        setMsg(error.error)
        setTitleMsg('Hubo un Error!')
        setDisabledButtonGetAll(false)
        botonModal.current.click()

      }
    }
  }

  return (
    <div className='generate-box'>
      <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
      <Modal setModalInfo={setModalInfo} modalIformativo={modalIfo} titleModal={titleMsg} bodyModal={msg} />

      <h1 className='h1 text-center'>Generar Excel</h1>
      <button disabled={disabledButtonGetAll} onClick={(e) => generateAllLogs(e)} className='btn btn-success h1'> {<Spinner loading={loadingGetAll} title={'Generar excel con todos los registros'} />}</button>
      <button onClick={() => setFiltrar(prev => !prev)} className='btn btn-success h1'>Generar excel filtrado</button>
      {filtrar &&
        <form className='form-generate'>
          <div className="mb-3">
            <label htmlFor="filtrarPorId" className="form-label">Por Id</label>
            <input onChange={(e) => handlerInputs(e)} value={porId} placeholder='ej. 12' type="number" className="form-control" id="filtrarPorId" aria-describedby="idHelp" />
          </div>
          <div className="mb-3">
            <label for="filtrarPorFecha" className="form-label">Fecha De Ingreso</label>
            <input  onChange={(e) => handlerInputs(e)} value={porFecha} type="date" className="form-control" id="filtrarPorFecha" />
          </div>
          <div className='d-flex justify-content-center d-md-12'>
          <button disabled={disabledButtonGetFilter} onClick={(e) => filterSearch({id:porId,date:porFecha},token) } className="btn btn-primary mb-2 ">
            {<Spinner loading={loadingGetFilter} title={'Aceptar'} />}
          </button>
          </div>
        </form>}
    </div>
  )
}

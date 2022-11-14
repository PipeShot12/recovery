import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './recovery.css'
import { arrayTipoDato,arrayCiudadOf,arrayDirOf,arrayTelOf, arrayObjEmail, arrayNit, arrayRazon } from '../../assets/arrayData'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import Select from '../../components/Select'
import { reverseDate } from '../../helpers/helpers'
import { generatePdf, createDoc } from '../../services/pdfServices'
import {createLog} from '../../services/logServices'
import { useUser } from '../../context/userContext'
export default function Index() {
  const {saveTemporalToken,localStorageToken} = useUser()
  const {token} =  saveTemporalToken || localStorageToken
  const [arregloDeArchivos, setArregloDeArchivos] = useState([])
  const botonModal = useRef(null)
  const [idSeleccionadorActual, setIdSeleccionadorActual] = useState('')
  const [desactivarBoton, setDesactivarBoton] = useState(false)
  const [todosLosRegistroExceptoEditado,setTodosLosRegistroExceptoEditado] = useState([])

  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [primerApellido, setPrimerApellido] = useState('')
  const [segundoApellido, setSegundoApellido] = useState('')
  const [documento, setDocumento] = useState('')
  const [direccion, setDireccion] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [dpto, setDpto] = useState('C/MARCA')
  const [celular, setCelular] = useState('')
  const [tipoDocu, setTipoDoc] = useState('CC')
  const [direccionOf, setDireccionOf] = useState('KRA 21 # 87 - 22')
  const [dptoOf, setDptoOf] = useState('C/MARCA')
  const [ciudadOf, setCiudadOf] = useState('BOGOTA')
  const [numeroOf, setNumeroOf] = useState('7498332')
  const [nitFinca, setNitFinca] = useState('900426164')
  const [razonFinca, setRazonfinca] = useState('ALIADOS LABORALES')
  const [cargo, setCargo] = useState('A Y P');
  const [salario, setSalario] = useState('1000000');
  const [emailFinca, setEmailFinca] = useState('');
  const [fechaDeIngreso, setFechaDeIngreso] = useState('')
  const [queFinca, setQueFinca] = useState('')

  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [modalIformarmativo, setModalInformativo] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [objEditar,setObjEditar] = useState(false)
  const [mostrarAdvertencia,setMostrarAdvertencia] = useState(false)
  const [aceptarAdvertencia,setAceptarAdvertencia] = useState(false)
  const [otroValor,setOtroValor] = useState(false)
  const agregarDatosArray = (e) => {
    e.preventDefault()
    if (primerNombre && primerApellido && tipoDocu && documento && direccion &&
        ciudad && dpto && celular && direccionOf && ciudad && dptoOf &&
        numeroOf && salario && fechaDeIngreso && queFinca &&nitFinca && razonFinca && emailFinca ) {
      setArregloDeArchivos(prev => {
        return [...prev,{
          id: uuidv4(),
          primerNombre,
          segundoNombre,
          primerApellido,
          segundoApellido,
          documento,
          direccion,
          dpto,
          celular,
          tipoDocu,
          direccionOf,
          dptoOf,
          ciudadOf,
          numeroOf,
          nitFinca,
          razonFinca,
          cargo,
          salario,
          emailFinca,
          fechaDeIngreso,
          ciudad,
          queFinca,
          
        }]
        
      })
      setTitleModal('Registrado!!')
      setBodyModal('La afiliacion se ha registrado existosamente!!')
      setModalInformativo(true)
      botonModal.current.click()
      setPrimerNombre('')
      setSegundoNombre('')
      setPrimerApellido('')
      setSegundoApellido('')
      setDocumento('')
      setDireccion('')
      setCelular('')
      document.getElementById('primerNombre').value = ''
      document.getElementById('segundoNombre').value = ''
      document.getElementById('primerApellido').value = ''
      document.getElementById('segundoApellido').value = ''
      document.getElementById('celular').value = ''
      document.getElementById('direccion').value = ''
      document.getElementById('documento').value = ''
    } else {
      setTitleModal('Se ha encontrado un error!')
      setBodyModal('Llena todos los campos del formulario')
      setModalInformativo(true)
      botonModal.current.click()

    }
  }
  const procesarArray = async (e, array) => {
    e.preventDefault()
 
    array.forEach((item,index)=>{
      generatePdf(item, index, array.length)
    })
  
      array.forEach((item) => {
        createDoc(item)
      })
      const duplicados = []
      const duplicadosContipoDifrente = []
      for(let i = 0 ; i < array.length; i++ ){
        for(let j = i + 1; j < array.length; j ++ ){
          if((array[i].documento === array[j].documento) && (array[i].tipoDocu === array[j].tipoDocu) ){
            duplicados.push(array[i])
            duplicados.push(array[j])
          }else if ((array[i].documento === array[j].documento) && (array[i].tipoDocu !== array[j].tipoDocu)){
            duplicadosContipoDifrente.push(array[i])
            duplicadosContipoDifrente.push(array[j])
          }
        }
      }
      if(duplicados.length > 0){
        let mostrarDup = ''
        for( let item of duplicados){
            mostrarDup += `<p></p><p>${item.tipoDocu} | ${item.documento} | ${item.primerNombre} ${item.primerApellido}</p>`
        }
        setModalInformativo(true)
        setTitleModal('Error datos duplicados')
        setBodyModal(`
        Se ha encontrado afiliacion/es con el mismo numero y tipo de documento:
        ${mostrarDup}`)
        botonModal.current.click() 
      }
      if(duplicadosContipoDifrente.length > 0){
        let mostrarDupConTipoDiferente = ''
        for( let item of duplicadosContipoDifrente){
            mostrarDupConTipoDiferente += `<p></p><p>${item.tipoDocu} | ${item.documento} | ${item.primerNombre} ${item.primerApellido}</p>`
        }
        setModalInformativo(true)
        setMostrarAdvertencia(true)
        setTitleModal('Advertencia!!')
        setBodyModal(`
        Se ha encontrado afiliacion/es con el mismo numero PERO UN TIPO DE DOCUMENTO DIFERENTE:
        ${mostrarDupConTipoDiferente}`)
        botonModal.current.click() 
      }
      if(aceptarAdvertencia){       
        const req = await createLog(array,token)
        if(req.ok){
          // const res = await req.json()
          setModalInformativo(true)
          setTitleModal('Registro Almacenado en BD')
          setBodyModal('Se ha almacenado correctamente en la base de datos!')
          botonModal.current.click()
          setAceptarAdvertencia(false)
        }else{
          const error = await req.json()
          setModalInformativo(true)
          setTitleModal('Error !')
          setBodyModal(error.error)
          setAceptarAdvertencia(false)
          botonModal.current.click()
        }
      }
      if(!(duplicados.length > 0) && !(duplicadosContipoDifrente.length > 0)){
        const req = await createLog(array,token)
        if(req.ok){
          // const res = await req.json()
          setModalInformativo(true)
          setTitleModal('Registro Almacenado en BD')
          setBodyModal('Se ha almacenado correctamente en la base de datos!')
          botonModal.current.click()
        }else{
          const error = await req.json()
          setModalInformativo(true)
          setTitleModal('Error !')
          setBodyModal(error.error)
          botonModal.current.click()
        }
      }
  }
  const handlerAdvertencia = (data) =>{
    setAceptarAdvertencia(data)
    setMostrarAdvertencia(false)
  }
  const guardarEdiccion = (e) =>{
    e.preventDefault()
    setArregloDeArchivos([...todosLosRegistroExceptoEditado,{
      id: documento,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      documento,
      direccion,
      dpto,
      celular,
      tipoDocu,
      direccionOf,
      dptoOf,
      ciudadOf,
      numeroOf,
      nitFinca,
      razonFinca,
      cargo,
      salario,
      emailFinca,
      fechaDeIngreso,
      ciudad,
      queFinca,
    }])
    setObjEditar(false)
    setModalEdit(false)
    setDocumento('')
    document.getElementById('documento').value = ''
    
    setPrimerNombre('')
    document.getElementById('primerNombre').value = ''
    
    setSegundoNombre('')
    document.getElementById('segundoNombre').value = ''

    setPrimerApellido('')
    document.getElementById('primerApellido').value = ''

    setSegundoApellido('')
    document.getElementById('segundoApellido').value = ''

    setDireccion('')
    document.getElementById('direccion').value = ''

    setCelular('')
    document.getElementById('celular').value = ''

    setCiudad('')
    document.getElementById('ciudad').value = ''

    setQueFinca('')
    document.getElementById('queFinca').value = ''

    setFechaDeIngreso('')
    document.getElementById('fechaDeIngreso').value = ''
    setEmailFinca('')
    document.getElementById('emailFinca').value = ''
  }
  const editarRegistroEspecifico = (e,id) =>{
    e.preventDefault()
    document.getElementById('closeModal').click()
    const objEspecifico = arregloDeArchivos.find(item=> item.id === id)
    const arrayNoEditado = arregloDeArchivos.filter(item => item.id !== id);
    setTodosLosRegistroExceptoEditado(arrayNoEditado)
    setObjEditar(objEspecifico)
    setModalEdit(true)
    if(objEspecifico.id){
      
      setDocumento(objEspecifico.documento)
      document.getElementById('documento').value = objEspecifico.documento
      
      setPrimerNombre(objEspecifico.primerNombre)
      document.getElementById('primerNombre').value = objEspecifico.primerNombre
      
      setSegundoNombre(objEspecifico.segundoNombre)
      document.getElementById('segundoNombre').value = objEspecifico.segundoNombre

      setPrimerApellido(objEspecifico.primerApellido)
      document.getElementById('primerApellido').value = objEspecifico.primerApellido

      setSegundoApellido(objEspecifico.segundoApellido)
      document.getElementById('segundoApellido').value = objEspecifico.segundoApellido

      setDireccion(objEspecifico.direccion)
      document.getElementById('direccion').value = objEspecifico.direccion

      setDpto(objEspecifico.dpto)
      document.getElementById('dpto').value = objEspecifico.dpto

      setCelular(objEspecifico.celular)
      document.getElementById('celular').value = objEspecifico.celular

      setTipoDoc(objEspecifico.tipoDocu)
      document.getElementById('tipoDeDoc').value = objEspecifico.tipoDocu

      setDireccionOf(objEspecifico.direccionOf)
      document.getElementById('direccionOf').value = objEspecifico.direccionOf

      setDptoOf(objEspecifico.dptoOf)
      document.getElementById('dptoOf').value = objEspecifico.dptoOf

      setCiudadOf(objEspecifico.ciudadOf)
      document.getElementById('ciudadOf').value = objEspecifico.ciudadOf

      setNumeroOf(objEspecifico.numeroOf)
      document.getElementById('numeroOf').value = objEspecifico.numeroOf

      setNitFinca(objEspecifico.nitFinca)
      document.getElementById('nitFinca').value = objEspecifico.nitFinca

      setRazonfinca(objEspecifico.razonFinca)
      document.getElementById('razonFinca').value = objEspecifico.razonFinca

      setCargo(objEspecifico.cargo)
      document.getElementById('cargoEmpleado').value = objEspecifico.cargo

      setSalario(objEspecifico.salario)
      document.getElementById('salario').value = objEspecifico.salario

      setEmailFinca(objEspecifico.emailFinca)
      document.getElementById('emailFinca').value = objEspecifico.emailFinca

      setFechaDeIngreso(objEspecifico.fechaDeIngreso)
      const formatDate = (objEspecifico.fechaDeIngreso).split('/')
      document.getElementById('fechaDeIngreso').value = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`

      setCiudad(objEspecifico.ciudad)
      document.getElementById('ciudad').value = objEspecifico.ciudad

      setQueFinca(objEspecifico.queFinca)
      document.getElementById('queFinca').value = objEspecifico.queFinca
      
    }


  }
  const cancelarEditar = (e) =>{
    e.preventDefault()
    setObjEditar(false)
    setModalEdit(false)
    setDocumento('')
    document.getElementById('documento').value = ''
    
    setPrimerNombre('')
    document.getElementById('primerNombre').value = ''
    
    setSegundoNombre('')
    document.getElementById('segundoNombre').value = ''

    setPrimerApellido('')
    document.getElementById('primerApellido').value = ''

    setSegundoApellido('')
    document.getElementById('segundoApellido').value = ''

    setDireccion('')
    document.getElementById('direccion').value = ''

    setCelular('')
    document.getElementById('celular').value = ''

    setQueFinca('')
    document.getElementById('queFinca').value = ''

    setFechaDeIngreso('')
    document.getElementById('fechaDeIngreso').value = ''
    setEmailFinca('')
    document.getElementById('emailFinca').value = ''
  }
  const editarAfiliacion = (e) =>{
    e.preventDefault()
    setTitleModal('Editar Afilicion')
    setModalEdit(true)
    botonModal.current.click()
    
  }
  const eleminarAfiliacion = (e,id) =>{
    const nuevoArreglo = arregloDeArchivos.filter(item => item.id !== id)
    setArregloDeArchivos(nuevoArreglo)
    document.getElementById('closeModal').click()
    
  }
  const nuevoPaquete = (e) => {
    e.preventDefault()
    if (arregloDeArchivos.length >= 1) {
      setModalInformativo(true)
      setArregloDeArchivos([])
      setTitleModal('Nuevo Paquete!!')
      setBodyModal('Se ha iniciado un nuevo paquete!!')
      botonModal.current.click()
     
      setDocumento('')
      document.getElementById('documento').value = ''
    
      setPrimerNombre('')
      document.getElementById('primerNombre').value = ''
      
      setSegundoNombre('')
      document.getElementById('segundoNombre').value = ''
  
      setPrimerApellido('')
      document.getElementById('primerApellido').value = ''
  
      setSegundoApellido('')
      document.getElementById('segundoApellido').value = ''
  
      setDireccion('')
      document.getElementById('direccion').value = ''
  
      setCelular('')
      document.getElementById('celular').value = ''
  
      setQueFinca('')
      document.getElementById('queFinca').value = ''
  
      setFechaDeIngreso('')
      document.getElementById('fechaDeIngreso').value = ''
      setEmailFinca('')
      document.getElementById('emailFinca').value = ''
      setCiudad('')
      document.getElementById('ciudad').value = ''
    }
  }
  const cambiarValorSelecionadores = (valor) => {
    const valorEnMayusculas = valor.toUpperCase()
    if (idSeleccionadorActual === 'direccionOf') {
      setDireccionOf(valorEnMayusculas)
      setIdSeleccionadorActual('')
      document.getElementById('direccionOf1').innerHTML = valorEnMayusculas
    }
    if (idSeleccionadorActual === 'ciudadOf') {
      setCiudadOf(valorEnMayusculas)
      setIdSeleccionadorActual('')
      document.getElementById('ciudadOf1').innerHTML = valorEnMayusculas
    }
    if (idSeleccionadorActual === 'numeroOf') {
      setNumeroOf(valorEnMayusculas)
      setIdSeleccionadorActual('')
      document.getElementById('numeroOf1').innerHTML = valorEnMayusculas
    }
    if (idSeleccionadorActual === 'nitFinca') {
      setNitFinca(valorEnMayusculas)
      setIdSeleccionadorActual('')
      document.getElementById('nitFinca1').innerHTML = valorEnMayusculas
    }
    if (idSeleccionadorActual === 'razonFinca') {
      setRazonfinca(valorEnMayusculas)
      setIdSeleccionadorActual('')
      document.getElementById('razonFinca1').innerHTML = valorEnMayusculas
    }
    if (idSeleccionadorActual === 'emailFinca') {
      setEmailFinca(valor.toLowerCase())
      setIdSeleccionadorActual('')
      document.getElementById('emailFinca1').innerHTML = valor.toLowerCase()
    }
    setOtroValor(false);
  }
  const selecionadores = ({ id, value }) => {
    setModalEdit(false)
    if (id === 'tipoDeDoc') {
      if (value !== 'OTRO') {
        setTipoDoc(value)
      }
    }
    if (id === 'direccionOf') {
      if (value !== 'OTRO') {
        setDireccionOf(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('direccionOf').value = ''
      }
    }
    if (id === 'ciudadOf') {
      if (value !== 'OTRO') {
        setCiudadOf(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('ciudadOf').value = ''
      }
    }
    if (id === 'numeroOf') {
      if (value !== 'OTRO') {
        setNumeroOf(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('numeroOf').value = ''
      }
    }
    if (id === 'nitFinca') {
      if (value !== 'OTRO') {
        setNitFinca(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('nitFinca').value = ''
      }
    }
    if (id === 'razonFinca') {
      if (value !== 'OTRO') {
        setRazonfinca(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('razonFinca').value = ''
      }
    }
    if (id === 'emailFinca') {
      if (value !== 'OTRO') {
        setEmailFinca(value)
      } else {
        setIdSeleccionadorActual(id)
        setOtroValor(true)
        botonModal.current.click()
        document.getElementById('emailFinca').value = ''
      }
    }
  }
  const handlerCerrarModal = () =>{
    // if(modalEdit){
    //   setAceptarAdvertencia(false)
    //   setMostrarAdvertencia(false)
    //   setModalInformativo(false)
    //   setModalEdit(false)
    // }
    // if(modalIformarmativo){
    //   setAceptarAdvertencia(false)
    //   setMostrarAdvertencia(false)
    //   setModalEdit(false)
    // }
    // if(mostrarAdvertencia){
    //   setModalInformativo(false)
    //   setModalEdit(false)
    // }
      setBodyModal('')
      setModalEdit(false)
      setTitleModal('')
      setAceptarAdvertencia(false)
      setMostrarAdvertencia(false)
      setModalInformativo(false)
      setModalEdit(false)
      setOtroValor(false)
 
  }
 
  return (
    <div className='new-file'>
      <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
      <Modal ingresarValor={otroValor}  eleminarValor={eleminarAfiliacion} cerrarModal={handlerCerrarModal} advertencia={mostrarAdvertencia} handlerAdvertencia={handlerAdvertencia} editarRegistro={editarRegistroEspecifico} modalEdit={modalEdit} array={arregloDeArchivos} setModalInfo={setModalInformativo} modalIformativo={modalIformarmativo} titleModal={titleModal} bodyModal={bodyModal} nuevoValor={cambiarValorSelecionadores} />
      <form className="row g-3 form-file">
          <h1 className='h1 text-center'>{objEditar ?`Editando afiliacion de ${objEditar.primerNombre} ${objEditar.primerApellido}`: 'Nueva Afiliacion'}</h1>
          {arregloDeArchivos.length > 0 ? 
          (
          <div className="col-md-12 d-md-flex justify-content-end">
            <button disabled={modalEdit} onClick={(e)=> editarAfiliacion(e)} class="btn btn-primary" >Editar Afiliacion</button>
          </div>): ''  
        }
        <TextField onChangeAction={setPrimerNombre} size={'col-md-3'} label={'primerNombre'} title={'Primer Nombre'} placeholder={'ej. Carlos'}/>
        <TextField onChangeAction={setSegundoNombre} size={'col-md-3'} label={'segundoNombre'} title={'Segundo Nombre'} placeholder={'ej. Antonio'}/>
        <TextField onChangeAction={setPrimerApellido} size={'col-md-3'} label={'primerApellido'} title={'Primer Apellido'} placeholder={'ej. Gomez'}/>
        <TextField onChangeAction={setSegundoApellido} size={'col-md-3'} label={'segundoApellido'} title={'Segundo Apellido'} placeholder={'ej. Sanchez'}/>
        <Select array={arrayTipoDato} size={'col-md-2'} label={'tipoDeDoc'} title={'Tipo Documento'} onChangeAction={selecionadores} newOptionId={'tipoDeDoc1'} defaultV={'CC'} keySub={'tipoDato'}/>
        <TextField onChangeAction={setDocumento} size={'col-md-3'} label={'documento'} title={'Numero Documento'} placeholder={'e.j 1025978254'}/>
        <TextField onChangeAction={setDireccion} size={'col-md-4'} label={'direccion'} title={'Direccion'} placeholder={'e.j cl 1 # 2 - 3'}/>
        <TextField onChangeAction={setCiudad} size={'col-md-3'} label={'ciudad'} title={'Ciudad'} placeholder={'ej. Ubate'}/>
        <TextField onChangeAction={setDpto} defaultV={'C/MARCA'} size={'col-md-2'} label={'dpto'} title={'Departamento'} placeholder={'ej. Boyaca'}/>
        <TextField onChangeAction={setCelular} size={'col-md-3'} value={celular} label={'celular'} title={'Celular'} placeholder={'ej. 3223078950'}/>
        <Select array={arrayDirOf} size={'col-md-4'} label={'direccionOf'} title={'Direccion Oficina'} onChangeAction={selecionadores} newOptionId={'direccionOf1'} defaultV={'KRA 21 # 87 - 22'} keySub={'dirOf'}/>
        <Select array={arrayCiudadOf} size={'col-md-3'} label={'ciudadOf'} title={'Direccion Oficina'} onChangeAction={selecionadores} newOptionId={'ciudadOf1'} defaultV={'BOGOTA'} keySub={'ciOf'}/>
        <TextField onChangeAction={setDptoOf} defaultV={'C/MARCA'} size={'col-md-3'} label={'dptoOf'} title={'Departamento Oficina'} placeholder={'ej. Nte Santander'}/>
        <Select array={arrayTelOf} size={'col-md-3'} label={'numeroOf'} title={'Numero Oficina'} onChangeAction={selecionadores} newOptionId={'numeroOf1'} defaultV={'7498332'} keySub={'ciOf'}/>
        <TextField onChangeAction={setCargo} defaultV={'A Y P'} size={'col-md-3'} label={'cargoEmpleado'} title={'Cargo Empleado'} placeholder={'e.j Aux Op'}/>
        <TextField onChangeAction={setSalario} defaultV={'1000000'} size={'col-md-3'} label={'salario'} title={'Salario'} placeholder={'e.j 1100000'}/>
        <div className="col-md-2">
          <label for="fechaDeIngreso" className="form-label">Fecha De Ingreso</label>
          <input onChange={(e) => setFechaDeIngreso(reverseDate((e.target.value).replace(/-/g, '/')))} type="date" className="form-control" id="fechaDeIngreso" />
        </div>
        <TextField onChangeAction={setQueFinca} size={'col-md-2'} label={'queFinca'} title={'Finca'} placeholder={'e.j BQT2'}/>
        <Select array={arrayObjEmail} size={'col-md-3'} label={'emailFinca'} title={'Email Finca'} onChangeAction={selecionadores} newOptionId={'emailFinca1'} keySub={'emailFinca'}/>
        <Select array={arrayNit} size={'col-md-2'} label={'nitFinca'} title={'Nit'} onChangeAction={selecionadores} defaultV={'900426164'} newOptionId={'nitFinca1'} keySub={'nitFinca'}/>
        <Select array={arrayRazon} size={'col-md-3'} label={'razonFinca'} title={'Razon Social'} onChangeAction={selecionadores} defaultV={'900426164'} newOptionId={'razonFinca1'} keySub={'razonFinca'}/>
        {objEditar ? (
        <div className='col-md-12 d-md-flex justify-content-end'>
          <button disabled={arregloDeArchivos.length < 1} onClick={(e)=> guardarEdiccion(e)} class="btn btn-primary" >Guardar</button>
          <button disabled={arregloDeArchivos.length < 1} onClick={(e)=> cancelarEditar(e)} class="btn btn-secondary" >Cancelar</button>

        </div>):
        <div className='d-md-flex justify-content-between'>
       
          <button onClick={(e) => agregarDatosArray(e)} class="btn btn-success btn-m" type="submit">Crear Afiliacion</button>
          <button disabled={arregloDeArchivos.length < 1} onClick={(e) => nuevoPaquete(e)} class="btn btn-danger btn-m" >Nuevo Paquete</button>
          <button disabled={arregloDeArchivos.length < 1 || desactivarBoton ? true : false} onClick={(e) => procesarArray(e, arregloDeArchivos)} class="btn btn-secondary btn-m btn-last" >Afiliaciones por procesar: {arregloDeArchivos.length}</button>
      </div>}
      </form>

    </div>
  )
}

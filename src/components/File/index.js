import { useState, useRef } from 'react'
import './file.css'
import Modal from '../Modal'
import { reverseDate, generatePdf, createDoc } from '../../helpers/helpers'
export default function Index() {
  const [arregloDeArchivos, setArregloDeArchivos] = useState([])
  const botonModal = useRef(null)
  const [idSeleccionadorActual, setIdSeleccionadorActual] = useState('')
  const [desactivarBoton, setDesactivarBoton] = useState(false)

  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [primerApellido, setPrimerApellido] = useState('')
  const [segundoApellido, setSegundoApellido] = useState('')
  const [documento, setDocumento] = useState('')
  const [direccion, setDireccion] = useState('')
  const [ciudad, setciudad] = useState('')
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
  const [salario, setSalario] = useState('1.000.000');
  const [emailFinca, setEmailFinca] = useState('');
  const [fechaDeIngreso, setFechaDeIngreso] = useState('')
  const [queFinca, setQueFinca] = useState('')

  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const [modalIformarmativo, setModalInformativo] = useState(false)
  const agregarDatosArray = (e) => {
    e.preventDefault()
    if (primerNombre && primerApellido && documento && direccion && dpto
      && celular && tipoDocu && direccionOf && dptoOf && ciudadOf && numeroOf && nitFinca && razonFinca &&
      cargo && salario && fechaDeIngreso && ciudad && queFinca) {
      setArregloDeArchivos(prev => [...prev, {
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
        queFinca
      }])
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
    } else {
      setTitleModal('Se ha encontrado un error!')
      setBodyModal('Llena todos los campos del formulario')
      setModalInformativo(true)
      botonModal.current.click()
      
    }
  }
  const procesarArray = (e, array) => {
    e.preventDefault()
      setDesactivarBoton(true)
      array.forEach((item, index)=> {
        generatePdf(item,index,array.length)
        setDesactivarBoton(false)
      })
    
    array.reverse().forEach((item) => {
      createDoc(item)
    })
  }
  const nuevoPaquete = (e) => {
    e.preventDefault()
    if(arregloDeArchivos.length >= 1){
      setModalInformativo(true)
      setArregloDeArchivos([])
      setTitleModal('Nuevo Paquete!!')
        setBodyModal('Se ha iniciado un nuevo paquete!!')
        botonModal.current.click()
        setPrimerNombre('')
        setSegundoNombre('')
        setPrimerApellido('')
        setSegundoApellido('')
        setDocumento('')
        setDireccion('')
        setCelular('')
        ciudad('')
        emailFinca('')
        queFinca('')
        fechaDeIngreso('')
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
    if (idSeleccionadorActual === 'correoE') {
      setEmailFinca(valorEnMayusculas.toLowerCase())
      setIdSeleccionadorActual('')
      document.getElementById('correoE1').innerHTML = valorEnMayusculas
    }
  }
  const selecionadores = ({ id, value }) => {
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
        botonModal.current.click()
        document.getElementById('direccionOf').value = ''
      }
    }
    if (id === 'ciudadOf') {
      if (value !== 'OTRO') {
        setCiudadOf(value)
      } else {
        setIdSeleccionadorActual(id)
        botonModal.current.click()
        document.getElementById('ciudadOf').value = ''
      }
    }
    if (id === 'numeroOf') {
      if (value !== 'OTRO') {
        setNumeroOf(value)
      } else {
        setIdSeleccionadorActual(id)
        botonModal.current.click()
        document.getElementById('numeroOf').value = ''
      }
    }
    if (id === 'nitFinca') {
      if (value !== 'OTRO') {
        setNitFinca(value)
      } else {
        setIdSeleccionadorActual(id)
        botonModal.current.click()
        document.getElementById('nitFinca').value = ''
      }
    }
    if (id === 'razonFinca') {
      if (value !== 'OTRO') {
        setRazonfinca(value)
      } else {
        setIdSeleccionadorActual(id)
        botonModal.current.click()
        document.getElementById('razonFinca').value = ''
      }
    }
    if (id === 'correoE') {
      if (value !== 'OTRO') {
        setEmailFinca(value)
      } else {
        setIdSeleccionadorActual(id)
        botonModal.current.click()
        document.getElementById('correoE').value = ''
      }
    }
  }

  return (
    <div className='new-file'>
      <button ref={botonModal} type="button" className="btn btn-primary boton-modal" data-bs-toggle="modal" data-bs-target="#exampleModal" />
      <Modal setModalInfo={setModalInformativo} modalIformativo={modalIformarmativo} titleModal={titleModal} bodyModal={bodyModal} nuevoValor={cambiarValorSelecionadores} />
      <form class="row g-3 needs-validation form-file" novalidate>
        <h1 className='h1 text-center'>Nueva Afiliacion</h1>
        <div className="col-md-3">
          <label for="primerNombre" className="form-label">Primer Nombre</label>
          <input autoComplete='off' onChange={(e) => setPrimerNombre(((e.target.value).toUpperCase().trim()).toUpperCase().trim())} value={primerNombre} type="text" className="form-control" id="primerNombre" placeholder="e.j Manuel" />
        </div>
        <div className="col-md-3">
          <label for="segundoNombre" className="form-label">Segundo Nombre</label>
          <input autoComplete='off' onChange={(e) => setSegundoNombre((e.target.value).toUpperCase().trim())} value={segundoNombre} type="text" className="form-control" id="segundoNombre" placeholder="e.j Antonio" />
        </div>
        <div className="col-md-3">
          <label for="primerApellido" className="form-label">Primer Apellido</label>
          <input autoComplete='off' onChange={(e) => setPrimerApellido((e.target.value).toUpperCase().trim())} value={primerApellido} type="text" className="form-control" id="primerApellido" placeholder="e.j Gomez" />
        </div>
        <div className="col-md-3">
          <label for="segundoApellido" className="form-label">Segundo Apellido</label>
          <input autoComplete='off' onChange={(e) => setSegundoApellido((e.target.value).toUpperCase().trim())} value={segundoApellido} type="text" className="form-control" id="segundoApellido" placeholder="e.j Sanchez" />
        </div>
        <div className="col-md-2">
          <label for="tipoDeDoc" className="form-label">Tipo Documento</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="tipoDeDoc" >
            <option disabled value="" id='tipoDeDoc1'>Selecionar...</option>
            <option defaultValue={'CC'} >C.C</option>
            <option value={'CE'} >C.E</option>
            <option value={'RCN'}>RCN</option>
            <option value={'TI'}>T.I</option>
            <option value={'PASAPORTE'}>PASAPORTE</option>
            <option value={'PASAPORTE DP'}>PASAPORTE DP</option>
            <option value={'PEP'}>PEP</option>
            <option value={'PT'}>PT</option>
          </select>
        </div>
        <div className="col-md-3">
          <label for="documento" className="form-label">Numero Documento</label>
          <input autoComplete='off' onChange={(e) => setDocumento((e.target.value).toUpperCase().trim())} value={documento} type="text" className="form-control" id="documento" placeholder="e.j 1.025.978.254" />
        </div>
        <div className="col-md-4">
          <label for="direccion" className="form-label">Direccion</label>
          <input autoComplete='off' onChange={(e) => setDireccion((e.target.value).toUpperCase())} value={direccion} type="text" className="form-control" id="direccion" placeholder="e.j cl 1 # 2 - 3" />
        </div>
        <div className="col-md-3">
          <label for="ciudad" className="form-label">Ciudad</label>
          <input autoComplete='off' onChange={(e) => setciudad((e.target.value).toUpperCase().trim())} value={ciudad} type="text" className="form-control" id="ciudad" placeholder="e.j ubate" />
        </div>
        <div className="col-md-2">
          <label for="dpto" className="form-label">Departamento</label>
          <input autoComplete='off' onChange={(e) => setDpto((e.target.value).toUpperCase().trim())} defaultValue='C/MARCA' type="text" className="form-control" id="dpto" placeholder="e.j boyaca" />
        </div>
        <div className="col-md-3">
          <label for="celular" className="form-label">Celular</label>
          <input autoComplete='off' onChange={(e) => setCelular((e.target.value).toUpperCase().trim())} value={celular} type="text" className="form-control" id="celular" placeholder="e.j 3147895248" />
        </div>
        <div className="col-md-4">
          <label for="direccionOf" className="form-label">Direccion Oficina</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="direccionOf" >
            <option disabled value="" id='direccionOf1'>Selecionar...</option>
            <option defaultValue={'KRA 21 # 87 - 22'} >KRA 21 # 87 - 22</option>
            <option value={"KM 4 VIA SUBA/COTA"}>KM 4 VIA SUBA/COTA</option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label for="ciudadOf" className="form-label">Ciudad Oficina</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="ciudadOf" >
            <option disabled value="" id='ciudadOf1'>Selecionar...</option>
            <option defaultValue={'BOGOTA'} >BOGOTA</option>
            <option value={"COTA"}>COTA</option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label for="dptoOf" className="form-label">Departamento Oficina</label>
          <input autoComplete='off' onChange={(e) => setDptoOf((e.target.value).toUpperCase().trim())} defaultValue='C/MARCA' type="text" className="form-control" id="dptoOf" placeholder="e.j santander" />
        </div>
        <div className="col-md-3">
          <label for="numeroOf" className="form-label">Numero Oficina</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="numeroOf" >
            <option disabled value="" id='numeroOf1'>Selecionar...</option>
            <option defaultValue={'7498332'} >7498332</option>
            <option value={"6800020"}>6800020</option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label for="cargoEmpleado" className="form-label">Cargo Empleado</label>
          <input autoComplete='off' onChange={(e) => setCargo((e.target.value).toUpperCase().trim())} defaultValue='A Y P' type="text" className="form-control" id="cargoEmpleado" placeholder="e.j aux op" />
        </div>
        <div className="col-md-3">
          <label for="salario" className="form-label">Salario</label>
          <input autoComplete='off' onChange={(e) => setSalario((e.target.value).toUpperCase().trim())} defaultValue='1.000.000' type="text" className="form-control" id="salario" placeholder="e.j 1.100.000" />
        </div>
        <div className="col-md-2">
          <label for="fechaDeIngreso" className="form-label">Fecha De Ingreso</label>
          <input onChange={(e) => setFechaDeIngreso(reverseDate((e.target.value).replace(/-/g, '/')))} type="date" className="form-control" id="fechaDeIngreso" />
        </div>
        <div className="col-md-2">
          <label for="queFinca" className="form-label">Finca</label>
          <input autoComplete='off' onChange={(e) => setQueFinca((e.target.value).toUpperCase().trim())} type="text" className="form-control" id="queFinca" placeholder="e.j BQT2" />
        </div>
        <div className="col-md-3">
          <label for="correoE" className="form-label">Email Finca</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="correoE" >
            <option disabled selected value="" id='correoE1'>Selecionar...</option>
            <option value={'contratacion_lapradera@sunshinebouquet.com'} >contratacion_lapradera@sunshinebouquet.com </option>
            <option value={"contratacion_bqt@sunshinebouquet.com "}>contratacion_bqt@sunshinebouquet.com</option>
            <option value={"contratacion_btq3@sunshinebouquet.com"}>contratacion_btq3@sunshinebouquet.com</option>
            <option value={"contratacion_betania@sunshinebouquet.com"}>contratacion_betania@sunshinebouquet.com</option>
            <option value={"analistacontratacion_cerezo@sunshinebouquet.com"}>analistacontratacion_cerezo@sunshinebouquet.com</option>
            <option value={"contratacion_santafe@sunshinebouquet.com"}>contratacion_santafe@sunshinebouquet.com</option>
            <option value={"contratacion_sanmarino1@sunshinebouquet.com"}>contratacion_sanmarino1@sunshinebouquet.com</option>
            <option value={"vpacheco@sunshinebouquet.com"}>vpacheco@sunshinebouquet.com</option>
            <option value={"contratacion_esmeralda@sunshinebouquet.com"}>contratacion_esmeralda@sunshinebouquet.com</option>
            <option value={"xsuarez@sunshinebouquet.com"}>xsuarez@sunshinebouquet.com</option>
            <option value={"contratacion_pradera2@sunshinebouquet.com"}>contratacion_pradera2@sunshinebouquet.com</option>
            <option value={"contratacion_bqt2@sunshinebouquet.com"}>contratacion_bqt2@sunshinebouquet.com </option>
            <option value={"contratacion_puebloviejo@sunshinebouquet.com"}>contratacion_puebloviejo@sunshinebouquet.com</option>
            <option value={"contratacion_santarosa@sunshinebouquet.com"}>contratacion_santarosa@sunshinebouquet.com </option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        <div className="col-md-2">
          <label for="nitFinca" className="form-label">Nit</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="nitFinca" >
            <option disabled value="" id='nitFinca1'>Selecionar...</option>
            <option defaultValue={'900426164'} >900426164</option>
            <option value={"830010738"}>830010738</option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        <div className="col-md-3">
          <label for="razonFinca" className="form-label">Razon Social</label>
          <select autoComplete='off' onChange={({ target }) => selecionadores(target)} className="form-select" id="razonFinca" >
            <option disabled value="" id='razonFinca1'>Selecionar...</option>
            <option defaultValue={'ALIADOS LABORALES'} >ALIADOS LABORALES</option>
            <option value={"CI SUNSHINE BOUQUET SAS"}>CI SUNSHINE BOUQUET SAS</option>
            <option value={"OTRO"}>Otro</option>
          </select>
        </div>
        {/* <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="invalidCheck"  oncli/>
              <label className="form-check-label" for="invalidCheck">
                Estan todos los datos registrados correctamente ?
              </label>
          </div>
        </div> */}
        <div className='d-md-flex'>
          <div className="col-md-4 d-md-flex justify-content-start ">
            <button onClick={(e) => agregarDatosArray(e)} class="btn btn-success" type="submit">Crear Afiliacion</button>
          </div>
          <div className="col-md-4 d-md-flex justify-content-center ">
            <button disabled={arregloDeArchivos.length < 1} onClick={(e) =>nuevoPaquete(e) } class="btn btn-primary" >Nuevo Paquete</button>
          </div>
          <div className="col-md-4 d-md-flex justify-content-end">
            <button disabled={arregloDeArchivos.length < 1 || desactivarBoton ? true: false } onClick={(e) => procesarArray(e, arregloDeArchivos)} class="btn btn-secondary" >Afiliaciones por procesar: {arregloDeArchivos.length}</button>
          </div>
        </div>

      </form>

    </div>
  )
}

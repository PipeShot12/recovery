import { useState } from "react"


export default function Index({ eleminarValor,ingresarValor, cerrarModal, nuevoValor, titleModal, bodyModal, modalIformativo, advertencia,modalEdit,array, editarRegistro,handlerAdvertencia}) {
    const [valorModificado, setValorModificado] = useState('')
    return (
        <>
            <div  className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{titleModal || 'Nuevo Valor'}</h5>
                            <button  onClick={()=> cerrarModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModal"></button>
                        </div>
                        {modalIformativo  && 
                        (<div className="modal-body">
                            <p className=""  dangerouslySetInnerHTML={{__html: bodyModal}}></p>
                        </div>)}
                        
                        {modalEdit &&
                        ((<div>
                            <div className="modal-body">
                                <p>Seleciona una afiliacion!</p>
                                {array.map((item,index) =>(
                                    <div className="d-md-flex justify-content-between">
                                        <button key={`editable-${index}`} type="button" className="btn btn-primary  mb-1" onClick={(e)=>editarRegistro(e,item.id)} >{`${item.primerNombre} ${item.primerApellido}`}</button>
                                        <button key={`delete-${index}`} type="button" className="btn btn-danger  mb-1" onClick={(e)=>eleminarValor(e,item.id)} >Borrar</button>
                                    </div>
                                ))}
                            </div>
                        </div>)   
                        )}
                        { ingresarValor &&
                        (<div className="modal-body">
                            <label for="nuevoValor" class="form-label">Ingresa el nuevo valor!</label>
                            <input onChange={(e) => setValorModificado(e.target.value)} type="text" class="form-control" id="nuevoValor" placeholder="Aqui!!!" required />
                        </div>)}
                        <div className="modal-footer">
                            {ingresarValor && ( <button type="button" className="btn btn-primary" onClick={() =>  nuevoValor(valorModificado)} data-bs-dismiss="modal">Aceptar</button>)}
                            {advertencia && <button type="button" className="btn btn-primary" onClick={()=> handlerAdvertencia(true)} data-bs-dismiss="modal">Aceptar</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


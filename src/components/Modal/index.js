import { useState } from "react"

export default function Index({ nuevoValor, titleModal, bodyModal, modalIformativo, setModalInfo }) {
    const [valorModificado, setValorModificado] = useState('')

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{titleModal || 'Modificar'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {modalIformativo ?
                        (<div class="modal-body">
                            <p className="">{bodyModal}</p>
                        </div>):
                        (<div className="modal-body">
                            <label for="nuevoValor" class="form-label">Ingresa el nuevo valor!</label>
                            <input onChange={(e) => setValorModificado(e.target.value)} type="text" class="form-control" id="nuevoValor" placeholder="Aqui!!!" required />
                        </div>)}
                        <div className="modal-footer">
                            {modalIformativo || <button type="button" className="btn btn-primary" onClick={() => modalIformativo ? "" : nuevoValor(valorModificado)} data-bs-dismiss="modal">Aceptar</button>}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalInfo(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


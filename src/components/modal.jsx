import React, { forwardRef } from "react"

const MyModal = forwardRef((props, ref) => (
        <>
            <input ref={ref} type="checkbox" id="my-modal-3" className="modal-toggle" defaultChecked={props?.show??false} />
            <div className="modal">
                <div className="modal-box relative">
                    <button type="button" onClick={()=>{ document.querySelector("#my-modal-3").checked = false; }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold">{ props.header }</h3>
                    <p className="py-4">{ props.message }</p>
                </div>
            </div>
        </>
))

export default MyModal;
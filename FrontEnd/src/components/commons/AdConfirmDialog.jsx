import React from 'react'
import { Modal } from "react-bootstrap";

export default function AdConfirmDialog(props) {
    return (
        <div
            className="modal-dialog modal- modal-dialog-centered modal-"
            role="document"
        >
            <Modal show={props.show} >
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                        Notification
                    </h6>
                    <button
                        type="button"
                        className="close"
                        onClick={props.handleClose}
                        aria-label="Close"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>
                        {props.message}
                    </p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={props.handleConfirm}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        className="btn btn-link  ml-auto"
                        onClick={props.handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    )
}

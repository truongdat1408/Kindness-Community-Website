import React from "react";
import { Modal } from "react-bootstrap";

const AdToast = (props) => {
    return (
        <>
            {
                props.type === "success" ?
                    <Modal show={props.show} >
                        <Modal.Header>
                            <Modal.Title className="mt-1"><span><i class="ni ni-bell-55"></i></span> NOTIFICATION</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{props.message}</p>
                        </Modal.Body>
                    </Modal>
                    :
                    <Modal show={props.show}>
                        <div className="modal-content bg-gradient-danger modal-danger">
                            <Modal.Header>
                                <Modal.Title className="mt-1"><span><i class="ni ni-bell-55"></i></span> ERROR</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="modal-title">{props.message}</p>
                            </Modal.Body>
                        </div>
                    </Modal>
            }
        </>
    );
};

export default AdToast;
import React from 'react'
import { Container, Button, Form, Modal } from 'react-bootstrap';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchUsers } from '../../../services/index';
import AdToast from '../../commons/AdToast';

const CreateUserModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("")
    const handleClose = () => {
        setShow(false)
    }
    useImperativeHandle(ref, () => ({
        handleShow() {
            setShow(true)
        }
    }));

    const initialState = {
        username: "",
        password: "",
        name: "",
        email: "",
        isOrg: false,
        roles: ["user"]
    };
    const roleOptions = [
        { text: "MODERATOR ROLE", value: "mod" },
        { text: "ORGANIZATION ROLE", value: "org" },
        { text: "USER ROLE", value: "user" },
    ]

    const [newUser, setNewUser] = useState(initialState);
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createUser(newUser))
            .then((response) => {
                setShow(false)
                setNewUser(initialState)
                setShowToast(true)
                setMessage(response.message)
                setTimeout(() => {
                    setShowToast(false)
                }, 3000);
            })
            .catch((error) => {
                setShowAlert(true)
                setMessage(error.message)
                setTimeout(() => {
                    setShowAlert(false)
                }, 2000);
            });
            dispatch(fetchUsers())
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    }

    const handleRoleChange = (event) => {
        setNewUser({ ...newUser, roles: [event.target.value] })
    }

    return (
        <>
            <AdToast show={showToast} message={message} type={"success"} />
            <AdToast show={showAlert} message={message} type={"error"} />
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="mt-1">CREATE A NEW USER</Modal.Title>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="input"
                                        value={newUser.username}
                                        placeholder="Name"
                                        name='username'
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={newUser.password}
                                        placeholder="Password"
                                        name='password'
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newUser.name}
                                        placeholder="Name"
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={newUser.email}
                                        placeholder="Email"
                                        name='email'
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className='mt-3' controlId="roleCheck">
                                    <Form.Label>ROLE</Form.Label>
                                    {
                                        roleOptions.map((choice, index) => (
                                            <Form.Check
                                                type="radio"
                                                label={choice.text}
                                                name="roles"
                                                id={index}
                                                value={choice.value}
                                                checked={newUser.roles.includes(choice.value)}
                                                onChange={handleRoleChange}
                                            />
                                        ))
                                    }
                                </Form.Group>
                            </div>
                            <div className="modal-footer">
                                <Button type="submit" className="btn btn-primary">Save</Button>
                                <button type="button" className="btn btn-link  ml-auto" onClick={handleClose}>Close</button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
})

export default CreateUserModal

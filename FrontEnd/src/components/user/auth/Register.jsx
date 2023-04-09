import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerAuthUser } from '../../../services';
import AdConfirmDialog from '../../commons/AdConfirmDialog';
import AdToast from '../../commons/AdToast';

export default function Register() {
    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const initialState = {
        username: "",
        password: "",
        name: "",
        email: "",
        isOrg: false,
        roles: ["user"]
    };
    const [newUser, setNewUser] = useState(initialState);
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const handleRoleChange = (event) => {
        setNewUser({ ...newUser, roles: [event.target.value] })
    }

    const roleOptions = [
        { text: "ORGANIZATION", value: "org" },
        { text: "NORMAL USER", value: "user" },
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Do you want to confirm to create this user?")
        setShowToast(true)
    }

    const handleConfirm = () => {
        setShowToast(false)
        dispatch(registerAuthUser(newUser)) //register user here change
            .then((response) => {
                setNewUser(initialState)
                setShowAlertSuccess(true)
                setMessage(response.message)
                setTimeout(() => {
                    setShowAlertSuccess(false)
                }, 3000);
            })
            .catch((error) => {
                setShowAlert(true)
                setMessage(error.message)
                setTimeout(() => {
                    setShowAlert(false)
                }, 2000);
            });
    }
    return (
        <>
            <div className="main-content">
                {/* Header */}
                <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">

                                    <h1 className="text-white">Create an account</h1>
                                    <p className="text-lead text-white">Register to join our Kindness Community</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <div className="container mt--8 pb-5">
                    {showToast && <AdConfirmDialog show={showToast} message={message} handleClose={() => setShowToast(false)} handleConfirm={handleConfirm}/>}
                    {showAlert && <AdToast show={showAlert} message={message} type={"error"} />}
                    {showAlertSuccess && <AdToast show={showAlertSuccess} message={message} type={"success"} />}
                    {/* Table */}
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card bg-secondary border-0">
                                <div className="card-body px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    
                                </div>
                                    <Form autoComplete="new-password" onSubmit={handleSubmit}>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-user"></i></span>
                                                </div>
                                                <Form.Control
                                                    type="input"
                                                    value={newUser.username}
                                                    placeholder="Username"
                                                    name='username'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-file-signature"></i></span>
                                                </div>
                                                <Form.Control
                                                    type="input"
                                                    value={newUser.name}
                                                    placeholder="Name"
                                                    name='name'
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                </div>
                                                <Form.Control
                                                    type="email"
                                                    value={newUser.email}
                                                    placeholder="Email"
                                                    name='email'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                                </div>
                                                <Form.Control
                                                    type="input"
                                                    value={newUser.address}
                                                    placeholder="Address"
                                                    name='address'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i class="fas fa-phone"></i></span>
                                                </div>
                                                <Form.Control
                                                    type="input"
                                                    value={newUser.phone}
                                                    placeholder="Phone"
                                                    name='phone'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <Form.Control
                                                    type="password"
                                                    value={newUser.password}
                                                    placeholder="Password"
                                                    name='password'
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <Form.Control
                                                    type="password"
                                                    value={confirmPassword}
                                                    placeholder="Confirm Password"
                                                    name='confirmPassword'
                                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <Form.Label><b>REGISTER AS</b></Form.Label>
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
                                        </div>

                                        <div className='form-group'>
                                            <Button type="submit" className="btn btn-primary mt-4">Create account</Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

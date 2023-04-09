import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { authenticateUser, logoutUser } from '../../../services/index';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const history = useHistory();
    const [error, setError] = useState();
    const [show, setShow] = useState(true);
    const initialState = {
        username: "",
        password: "",
    };
    const [user, setUser] = useState(initialState);

    const dispatch = useDispatch();

    const credentialChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        dispatch(logoutUser())
    }, [dispatch])

    const validateUser = (event) => {
        event.preventDefault();
        dispatch(authenticateUser(user.username.trim(), user.password))
            .then((response) => {
                return response.roles.includes("ROLE_ADMIN")|| response.roles.includes("ROLE_MOD")? history.push("/admin/home") : history.push("/")
            })
            .catch((error) => {
                setShow(true);
                setError(error.response.data.message ? error.response.data.message :  "Username or password is incorrect! Please check again.");
            });
    };

    const alertMessage = (
        <div className="alert alert-danger" role="alert">
            <span className="alert-text"><strong>Warning!</strong> {error}</span>
        </div>
    )

    return (
        <div className="main-content">
            {/* Header */}
            <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                <div className="container">
                    <div className="header-body text-center mb-7">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                <h1 className="text-white">Welcome!</h1>
                                <p className="text-lead text-white">You can login or register to join our Kindness Community</p>
                            </div>
                        </div>
                        {show && error && alertMessage}
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
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card bg-secondary border-0 mb-0">
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <p>Sign in with credentials</p>
                                </div>
                                {/* FORM  */}
                                <form autoComplete="new-password">
                                    {/* USERNAME  */}
                                    <div className="form-group mb-3">
                                        <div className="input-group input-group-merge input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                            </div>
                                            <input className="form-control" name="username" defaultValue={user.username} onChange={credentialChange} placeholder="Username" type="text" autoComplete="new-password" />
                                        </div>
                                    </div>
                                    {/* PASSWORD  */}
                                    <div className="form-group">
                                        <div className="input-group input-group-merge input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                            </div>
                                            <input className="form-control" name="password" defaultValue={user.password} onChange={credentialChange} placeholder="Password" type="password" autoComplete="new-password" />
                                        </div>
                                    </div>
                                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                        <label className="custom-control-label" htmlFor=" customCheckLogin">
                                            <span className="text-muted">Remember me</span>
                                        </label>
                                    </div> */}
                                    <div className="text-center">
                                        <button type="submit" onClick={validateUser} className="btn btn-primary my-4">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-8 text-right">
                                <Link to={"/register"} className="text-light"><small>Create new account</small></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

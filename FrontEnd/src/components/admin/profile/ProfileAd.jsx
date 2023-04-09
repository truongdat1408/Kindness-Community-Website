/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form } from "react-bootstrap";
import { storage } from "../../../firebase/index";
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../services';
import AdToast from '../../commons/AdToast';

export default function ProfileAd() {
    const profile = useSelector(state => state.auth.profile);
    const user = useSelector(state => state.auth.user);

    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("")

    const [userInfo, setUserInfo] = useState(profile)

    const dispatch = useDispatch()

    const changeInForm = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
        checkChange();
    }

    const checkChange = () => {
        return JSON.stringify(userInfo) === JSON.stringify(profile)
    }

    const imgSelected = (e) => {
        console.log(e.target.files[0])
        let image = e.target.files[0]
        const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // const progress = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("profiles")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUserInfo({ ...userInfo, avatar_url: url });
                    });
            }
        );
    }

    const changeImageClick = () => {
        document.getElementById('select-img').click()
    }

    const confirmSave = () => {
        dispatch(updateProfile(userInfo)).then((response) => {
            setShowToast(true)
            setMessage("Your profile is saved!")
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
    }

    return (
        <>
            <AdToast show={showToast} message={message} type={"success"} />
            <AdToast show={showAlert} message={message} type={"error"} />
            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col-xl-4 order-xl-2">
                        <div className="card card-profile">
                            <img
                                src="../assets/img/theme/img-1-1000x600.jpg"
                                alt="Image placeholder"
                                className="card-img-top"
                            />
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                        <a href={userInfo.avatar_url || "../assets/img/theme/Default-avatar.jpg"} target="_blank" rel="noreferrer">
                                            <img
                                                src={userInfo.avatar_url || "../assets/img/theme/Default-avatar.jpg"}
                                                className="rounded-circle"
                                                style={{ width: 120, height: 120 }}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        {/* <input type="file" className="btn btn-sm btn-info mt-4 mb-2">Change Image</input> */}
                                        <button onClick={changeImageClick} className="btn btn-sm btn-info mt-4 mb-2 mr-1">Change Image</button>
                                        <input id='select-img' type="file" onChange={imgSelected} style={{ display: "none" }} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h5 className="h3">
                                        {profile.name}
                                    </h5>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin" />
                                        {profile.address}
                                    </div>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24" />
                                        ROLE
                                    </div>
                                    <div>
                                        <i className="ni education_hat" />
                                        {user.roles.includes('ROLE_ADMIN') ? "ADMIN" : user.roles.includes('ROLE_MOD') ? "ROLE_MOD" : "Not Administators"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 order-xl-1">
                        <div className="card">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <h3 className="mb-0">Profile </h3>
                                    </div>
                                    <div className="col-4 text-right">
                                        <button className="btn btn-sm btn-primary" disabled={checkChange()} onClick={confirmSave}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Form>

                                    <h6 className="heading-small text-muted mb-4">User information</h6>
                                    <div className="pl-lg-4">
                                        {/* <Form.Row> */}
                                        <div className="row">
                                            <div className="col-lg-6">

                                                <div className='form-group' controlId='formUsername'>
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control
                                                        type="input"
                                                        value={userInfo.username}
                                                        placeholder='Username'
                                                        onChange={changeInForm}
                                                        name='username'
                                                        disabled
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-lg-6">
                                                <div className='form-group' controlId='formName'>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="input"
                                                        value={userInfo.name}
                                                        placeholder='Name'
                                                        onChange={changeInForm}
                                                        name='name'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div controlId='formEmail' className='form-group'>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        value={userInfo.email}
                                                        placeholder='Email'
                                                        onChange={changeInForm}
                                                        name='email'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">Contact information</h6>

                                    <div className="pl-lg-4">

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <Form.Label>Address</Form.Label>
                                                    <Form.Control
                                                        type="input"
                                                        value={userInfo.address}
                                                        placeholder='Address'
                                                        onChange={changeInForm}
                                                        name='address'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <Form.Label>Phone</Form.Label>
                                                    <Form.Control
                                                        type="input"
                                                        value={userInfo.phone}
                                                        placeholder='Phone'
                                                        onChange={changeInForm}
                                                        name='phone'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />

                                    <h6 className="heading-small text-muted mb-4">About me</h6>
                                    <div className="pl-lg-4">
                                        <div className="form-group">
                                            <Form.Label>About me</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                type='input'
                                                value={userInfo.about}
                                                placeholder='About me'
                                                onChange={changeInForm}
                                                name='about'
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer here  */}
            </div >
        </>

    )
}

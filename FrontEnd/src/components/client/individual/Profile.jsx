import React from 'react'
import AdConfirmDialog from '../../commons/AdConfirmDialog';
import AdToast from '../../commons/AdToast';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateProfile } from './../../../services/user/auth/authAction';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const profile = useSelector(state => state.auth.profile);
    const otherUser = useSelector(state => state.user.user);
    const [userInfo, setUserInfo] = useState(profile)

    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const { profile_username } = useParams()

    useEffect(() => {
        if (profile_username) {
            setUserInfo({ ...otherUser })
        } else {
            setUserInfo({ ...profile })
        }
    }, [otherUser, profile, profile_username])

    const isMine = () => {
        return profile_username === undefined || profile_username === profile.username
    }

    const changeInForm = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
        checkChange();
    }

    const checkChange = () => {
        return JSON.stringify(userInfo) === JSON.stringify(profile)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Do you want to confirm to change profile?")
        setShowToast(true)
    }

    const handleConfirm = () => {
        setShowToast(false) //close confirm box
        dispatch(updateProfile(userInfo)).then((response) => {
            setShowAlertSuccess(true)
            setMessage("Your profile is saved!")
            setTimeout(() => {
                setShowAlertSuccess(false)
            }, 3000);
        })
            .catch((error) => {
                setShowAlert(true)
                if (error.response.status === 500)
                    setMessage("Email is existed or other wrong fields!")
                else
                    setMessage(error)
                setTimeout(() => {
                    setShowAlert(false)
                }, 2000);
            });
    }

    return (
        <>
            <div className="central-meta">
                {showToast && <AdConfirmDialog show={showToast} message={message} handleClose={() => setShowToast(false)} handleConfirm={handleConfirm} />}
                {showAlert && <AdToast show={showAlert} message={message} type={"error"} />}
                {showAlertSuccess && <AdToast show={showAlertSuccess} message={message} type={"success"} />}
                <div className="editing-info">
                    <h5 className="f-title">
                        <i className="ti-info-alt" /> Edit Basic Information
                    </h5>
                    <form method="post">

                        <div className="form-group half">
                            <input type="text" id="input" required="required" value={userInfo.username} />
                            <label className="control-label" htmlFor="input">
                                Username
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group half">
                            {isMine() ? <input type="text" required="required" value={userInfo.name} name='name' onChange={changeInForm} /> : <input type="text" required="required" value={userInfo.name} />}
                            <label className="control-label" htmlFor="input">
                                Name
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            {isMine() ?
                                <input type="email" required="required" value={userInfo.email} name='email' onChange={changeInForm} />
                                :
                                <input type="email" required="required" value={userInfo.email} />
                            }
                            <label className="control-label" htmlFor="input">
                                <a
                                    href="http://www.wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="094c6468606549"
                                >
                                    Email
                                </a>
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            {isMine() ?
                                <input type="text" required="required" value={userInfo.phone} name='phone' onChange={changeInForm} />
                                :
                                <input type="text" required="required" value={userInfo.phone} />
                            }
                            <label className="control-label" htmlFor="input">
                                Phone
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            {isMine() ?
                                <input type="text" required="required" value={userInfo.address} name='address' onChange={changeInForm} />
                                :
                                <input type="text" required="required" value={userInfo.address} />
                            }
                            <label className="control-label" htmlFor="input">
                                Address
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            {isMine() ? 
                            <textarea
                                rows={4}
                                id="textarea"
                                required="required"
                                value={userInfo.about}
                                name='about'
                                onChange={changeInForm}
                            /> : 
                            <textarea
                                rows={4}
                                id="textarea"
                                required="required"
                                value={userInfo.about}
                            />
                            }
                            <label className="control-label" htmlFor="textarea">
                                About Me
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        {isMine() && <div className="submit-btns">
                            <button type="button" className="mtr-btn" disabled={checkChange()} onClick={handleSubmit}>
                                <span>Update</span>
                            </button>
                        </div>}
                    </form>
                </div>
            </div>
        </>
    )
}

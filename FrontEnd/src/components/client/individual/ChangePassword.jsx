import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../services';
import AdConfirmDialog from './../../commons/AdConfirmDialog';
import AdToast from './../../commons/AdToast';

export default function ChangePassword() {
    const profile = useSelector(state => state.auth.profile);

    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [message, setMessage] = useState("")

    const initState = {
        id: profile.id,
        currentPassword: "",
        newPassword: ""
    }

    const [confirmPassword, setConfirmPassword] = useState("")
    const [passReq, setPassReq] = useState(initState)

    const dispatch = useDispatch()

    const checkChange = () => {
        return passReq.newPassword !== confirmPassword || confirmPassword === "" || passReq.currentPassword === ""
    }

    const changeInForm = (event) => {
        const { name, value } = event.target;
        setPassReq({ ...passReq, [name]: value });
        checkChange();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Do you want to confirm to change profile?")
        setShowToast(true)
    }

    const handleConfirm = () => {
        setShowToast(false) //close confirm box
        dispatch(changePassword(passReq)).then((response) => {
            setShowAlertSuccess(true)
            setMessage("Your password is changed!")
            setTimeout(() => {
                setShowAlertSuccess(false)
                setPassReq(initState)
                setConfirmPassword("")
            }, 3000);
        })
        .catch((error) => {
            setShowAlert(true)
            if(error.response.status === 500)
                setMessage("Error Server!")
            else
                setMessage(error.response.data.message)
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
                        <i className="ti-lock" />
                        Change Password
                    </h5>
                    <form method="post">
                        <div className="form-group">
                            <input type="password" id="input" required="required" value={passReq.newPassword} name='newPassword' onChange={changeInForm}/>
                            <label className="control-label" htmlFor="input">
                                New password
                            </label>
                            <i className="mtrl-select" />
                        </div>
                        <div className="form-group">
                            <input type="password" required="required" value={confirmPassword} name='confirmPassword' onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            <label className="control-label" htmlFor="input">
                                Confirm password
                            </label>
                            <i className="mtrl-select" />
                        </div>
                        <div className="form-group">
                            <input type="password" required="required" value={passReq.currentPassword} name='currentPassword' onChange={changeInForm}/>
                            <label className="control-label" htmlFor="input">
                                Current password
                            </label>
                            <i className="mtrl-select" />
                        </div>
                        <div className="submit-btns">
                            <button type="button" className="mtr-btn" onClick={handleSubmit} disabled={checkChange()}>
                                <span>Update</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

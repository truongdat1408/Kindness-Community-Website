import React from 'react'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import changeToDate from './../../../pages/commonFunc/changeToDate';
import changeToTime from './../../../pages/commonFunc/changeToTime';
import AdConfirmDialog from './../../commons/AdConfirmDialog';
import AdToast from './../../commons/AdToast';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity } from '../../../services';
import { useHistory } from 'react-router-dom';
import { storage } from '../../../firebase';
import authToken from './../../../utils/authToken';

export default function CreateActivity() {
    const profile = useSelector(state => state.auth.profile);

    const [showToast, setShowToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [message, setMessage] = useState("")

    const initialState = {
        name: "Activity Name",
        desc: "",
        address: profile.address,
        phone: profile.phone,
        email: profile.email,
        contactName: profile.name,
        memberNumber: 2,
        sTime: changeToTime(new Date().toISOString()),
        sDate: changeToDate(new Date().toISOString()),
        eTime: changeToTime(new Date().toISOString()),
        eDate: changeToDate(new Date().toISOString()),
        adminId: profile.id,
        cover_url: "",
        createAt: ""
    };

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
        }
    }, [])

    const [newActvitiy, setNewActvitiy] = useState(initialState)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewActvitiy({ ...newActvitiy, [name]: value });
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Do you want to confirm to create this activity?")
        setShowToast(true)
    }

    const history = useHistory()
    const handleCancel = () => {
        history.push("/")
    }

    const imgSelected = (e) => {
        console.log(e.target.files[0])
        let image = e.target.files[0]
        const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(progress)
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
                        setNewActvitiy({ ...newActvitiy, cover_url: url });
                        console.log(url)
                        setShowAlertSuccess(true)
                        setMessage("Cover image is uploaded successfully!")
                        setTimeout(() => {
                            setShowAlertSuccess(false)
                        }, 3000);
                    });
            }
        );
    }

    const handleConfirm = () => {
        console.log(newActvitiy)
        setShowToast(false) //close confirm box
        dispatch(createActivity(newActvitiy)) //create activity
            .then((response) => {
                setNewActvitiy(initialState)
                setShowAlertSuccess(true)
                setMessage("Activity is created successfully!")
                setTimeout(() => {
                    setShowAlertSuccess(false)
                    history.push("/group/"+response.id)
                }, 3000);
            })
            .catch((error) => {
                setShowAlert(true)
                setMessage(error.message ? error.message : "Activity is created unsuccessfully!")
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
                        <i className="ti-info-alt" /> Create Activity
                    </h5>
                    <form method="post">
                        <div className="form-group">
                            <h4>
                                Cover Image
                            </h4>
                            <input type="file" required="required" name='cover_url' accept="image/png, image/jpeg" onChange={imgSelected}/>
                        </div>

                        <div className="form-group">
                            <input type="text" id="input" required="required" value={newActvitiy.name} name='name' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Activity Name
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="email" required="required" value={newActvitiy.email} name='email' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                <a
                                    href="http://www.wpkixx.com/cdn-cgi/l/email-protection"
                                    className="__cf_email__"
                                    data-cfemail="07426a666e6b47"
                                >
                                    Email
                                </a>
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="text" required="required" value={newActvitiy.phone} name='phone' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Phone
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="text" required="required" value={newActvitiy.contactName} name='contactName' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Contact Name
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="text" required="required" value={newActvitiy.address} name='address' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Address
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="number" required="required" min={2} value={newActvitiy.memberNumber} name='memberNumber' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Member number
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className='form-group half'>
                            <label htmlFor="" className='mr-2'><b>Start Datetime: </b></label>
                            <Form.Control type="date" style={{ fontSize: 14 }} value={newActvitiy.sDate} name='sDate' onChange={handleChange} />
                            <Form.Control type="time" style={{ fontSize: 14 }} value={newActvitiy.sTime} name='sTime' onChange={handleChange} className='mt-1' />
                        </div>

                        <div className='form-group half'>
                            <label htmlFor="" className='mr-2'><b>End Datetime: </b></label>
                            <Form.Control type="date" min={newActvitiy.sDate} style={{ fontSize: 14 }} value={newActvitiy.eDate} name='eDate' onChange={handleChange} />
                            <Form.Control
                                type="time"
                                name='eTime'
                                style={{ fontSize: 14 }}
                                value={newActvitiy.eTime}
                                min={ newActvitiy.sDate === newActvitiy.eDate ? newActvitiy.sTime : null }
                                onChange={handleChange}
                                className='mt-1' />
                        </div>

                        <div className="form-group">
                            <textarea
                                rows={4}
                                id="textarea"
                                required="required"
                                defaultValue={newActvitiy.desc}
                                onChange={handleChange}
                                name="desc"
                            />
                            <label className="control-label" htmlFor="textarea">
                                Detail Description
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="submit-btns">
                            <button type="button" className="mtr-btn mr-1" onClick={handleCancel}>
                                <span>Back Home</span>
                            </button>
                            <button type="button" className="mtr-btn" onClick={handleSubmit}>
                                <span>Create</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

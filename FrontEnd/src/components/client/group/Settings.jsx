import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { updateActivity } from '../../../services'

export default function Settings() {
    const { admin, activity } = useSelector(state => state.activity)
    const profile = useSelector(state => state.auth.profile)

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    const isJoined = () => {
        if (activity.members) {
            for (var i = 0; i < activity.members.length; i++) {
                if (activity.members[i].id === profile.id) return true
            }
        }
        return false
    }

    const initialState = useRef({
        id: activity.id,
        name: activity.name,
        desc: activity.desc,
        address: activity.address,
        phone: activity.phone,
        email: activity.email,
        contactName: activity.contactName,
        memberNumber: activity.memberNumber,
        sTime: activity.sTime,
        sDate: activity.sDate,
        eTime: activity.eTime,
        eDate: activity.eDate
    });

    const [newActvitiy, setNewActvitiy] = useState(initialState.current)

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'memberNumber') {
            let total = activity.waitMembers.length + activity.members.length
            if (value < total) {
                alert("Number of Members can not be less than total members!")
                return
            }
        }
        setNewActvitiy({ ...newActvitiy, [name]: value });
    }

    const clickReset = () => {
        setNewActvitiy(initialState.current)
    }

    const dispatch = useDispatch()
    
    const clickUpdate = () => {
        console.log(newActvitiy)
        dispatch(updateActivity(newActvitiy)).then((response) => {
            console.log(response)
            console.log("Done!");
            initialState.current = {
                id: response.id,
                name: response.name,
                desc: response.desc,
                address: response.address,
                phone: response.phone,
                email: response.email,
                contactName: response.contactName,
                memberNumber: response.memberNumber,
                sTime: response.sTime,
                sDate: response.sDate,
                eTime: response.eTime,
                eDate: response.eDate
            }
            clickReset()
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            {isJoined() ? <div className="central-meta">
                {/* {showToast && <AdConfirmDialog show={showToast} message={message} handleClose={() => setShowToast(false)} handleConfirm={handleConfirm} />}
                {showAlert && <AdToast show={showAlert} message={message} type={"error"} />}
                {showAlertSuccess && <AdToast show={showAlertSuccess} message={message} type={"success"} />} */}

                <div className="editing-info">
                    <h5 className="f-title">
                        <i className="ti-info-alt" /> Activity Settings {!isAdmin() && "[Only for Admin]"}
                    </h5>
                    <form method="post">
                        <div className="form-group">
                            <input type="text" id="input" required="required" value={newActvitiy.name} name='name' disabled={!isAdmin()} onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Activity Name
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="email" required="required" value={newActvitiy.email} disabled={!isAdmin()} name='email' onChange={handleChange} />
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
                            <input type="text" required="required" value={newActvitiy.phone} disabled={!isAdmin()} name='phone' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Phone
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="text" required="required" value={newActvitiy.contactName} disabled={!isAdmin()} name='contactName' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Contact Name
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="text" required="required" value={newActvitiy.address} disabled={!isAdmin()} name='address' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Address
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className="form-group">
                            <input type="number" required="required" min={2} value={newActvitiy.memberNumber} disabled={!isAdmin()} name='memberNumber' onChange={handleChange} />
                            <label className="control-label" htmlFor="input">
                                Member number
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        <div className='form-group half'>
                            <label htmlFor="" className='mr-2'><b>Start Datetime: </b></label>
                            <Form.Control type="date" style={{ fontSize: 14 }} disabled={!isAdmin()} value={newActvitiy.sDate} name='sDate' onChange={handleChange} />
                            <Form.Control type="time" style={{ fontSize: 14 }} disabled={!isAdmin()} value={newActvitiy.sTime} name='sTime' onChange={handleChange} className='mt-1' />
                        </div>

                        <div className='form-group half'>
                            <label htmlFor="" className='mr-2'><b>End Datetime: </b></label>
                            <Form.Control type="date" min={newActvitiy.sDate} style={{ fontSize: 14 }} disabled={!isAdmin()} value={newActvitiy.eDate} name='eDate' onChange={handleChange} />
                            <Form.Control
                                type="time"
                                name='eTime'
                                style={{ fontSize: 14 }}
                                value={newActvitiy.eTime}
                                min={newActvitiy.sDate === newActvitiy.eDate ? newActvitiy.sTime : null}
                                onChange={handleChange}
                                disabled={!isAdmin()}
                                className='mt-1' />
                        </div>

                        <div className="form-group">
                            <textarea
                                rows={4}
                                id="textarea"
                                required="required"
                                value={newActvitiy.desc}
                                onChange={handleChange}
                                name="desc"
                                disabled={!isAdmin()}
                            />
                            <label className="control-label" htmlFor="textarea">
                                Detail Description
                            </label>
                            <i className="mtrl-select" />
                        </div>

                        {isAdmin() && <div className="submit-btns">
                            <button type="button" className="mtr-btn mr-1" onClick={(e) => {clickReset()}}>
                                <span>Reset</span>
                            </button>
                            <button type="button" className="mtr-btn" onClick={(e) => {clickUpdate()}}>
                                <span>Update</span>
                            </button>
                        </div>}
                    </form>
                </div>
            </div>
                :
                ///////////////// IF NOT JOINNED //////////////////
                <div className="central-meta">
                    <div className="about">
                        <div className="personal">
                            <h5 className="f-title"><i className="ti-info-alt" /> Activity Info</h5>
                            <p>
                                {activity.desc}
                            </p>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <ul className="nav nav-tabs nav-tabs--vertical nav-tabs--left">
                                <li className="nav-item">
                                    <a href="#basic" className="nav-link active" data-toggle="tab">Admin Info</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#work" className="nav-link" data-toggle="tab">Activity Details</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#interest" className="nav-link" data-toggle="tab">Time</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#lang" className="nav-link" data-toggle="tab">Number of Members</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="basic">
                                    <ul className="basics">
                                        <li><i className="ti-user" />{admin.name}</li>
                                        <li><i className="ti-map" />{admin.address}</li>
                                        <li><i className="ti-world" />{admin.about}</li>
                                        <li><i className="ti-mobile" />{isJoined() ? admin.phone : "[Join to see]"}</li>
                                        <li><i className="ti-email" />{isJoined() ? admin.email : "[Join to see]"}</li>
                                    </ul>
                                </div>

                                <div className="tab-pane fade" id="work" role="tabpanel">
                                    <div>
                                        <p><b>Address: </b>{activity.address}</p>
                                        <p><b>Contact name: </b>{activity.contactName}</p>
                                        <p><b>Phone: </b>{activity.phone}</p>
                                        <p><b>Email: </b>{activity.email}</p>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="interest" role="tabpanel">
                                    <ul className="basics">
                                        <li><b>Start Time:</b> {activity.sDate} at {activity.sTime}</li>
                                        <li><b>End Time:</b> {activity.eDate} at {activity.eTime}</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="lang" role="tabpanel">
                                    <ul className="basics">
                                        <li><b>Members:</b> {activity.members ? activity.members.length : null}/{activity.memberNumber}</li>
                                        <li><b>Number of people waiting for approval:</b> {!isJoined() ? "[Join to see]" : activity.waitMembers ? activity.waitMembers.length : 0}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

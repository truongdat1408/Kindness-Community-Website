/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
import authToken from '../../../utils/authToken'
import { useDispatch } from 'react-redux';
import { acceptJoinActivity, getWaitMembersByActivityId, unjoinActivity } from '../../../services';

export default function Members() {
    const { admin, activity } = useSelector(state => state.activity)
    const profile = useSelector(state => state.auth.profile)

    const dispatch = useDispatch()

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    if (localStorage.getItem('jwtToken')) {
        authToken(localStorage.getItem('jwtToken'))
    }

    const clickAcceptJoin = (joinReq) => {
        dispatch(acceptJoinActivity(joinReq)).then((resp) => {
            dispatch(getWaitMembersByActivityId(activity.id))
        })
    }

    const clickLeave = (usr_id) => {
        dispatch(unjoinActivity({ activity_id: activity.id, user_id: usr_id }))
            .then((resp) => {
                console.log(resp)
                dispatch(getWaitMembersByActivityId(activity.id))
            })
    }

    return (
        <>
            <div className="central-meta">
                <div className="frnds">
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">Members</a> <span>{activity.members ? activity.members.length : 0}</span></li>
                        {isAdmin() && <li className="nav-item"><a className href="#frends-req" data-toggle="tab">Requests</a><span>{activity.waitMembers ? activity.waitMembers.length : 0}</span></li>}
                    </ul>

                    {/* Tab panes */}
                    <div className="tab-content">
                        <div className="tab-pane active fade show " id="frends">
                            <ul className="nearby-contct">
                                {activity.members && activity.members.map((member) => {
                                    return (
                                        <li key={member.id}>
                                            <div className="nearly-pepls">
                                                <figure>
                                                    <a href="" title><img src={member.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} style={{ width: 50, height: 50 }} alt="" /></a>
                                                </figure>
                                                <div className="pepl-info">
                                                    <h4><a href="">{member.user.name}</a></h4>
                                                    <span>{isAdmin() ? "Admin" : "Member"}</span>
                                                    {isAdmin() && profile.id !== member.id && <a href="" className="add-butn more-action" onClick={(e) => {e.preventDefault(); clickLeave(member.id)}}>Remove Member</a>}
                                                    {profile.id !== member.id && <a href="" className="add-butn">Follow</a>}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="tab-pane fade" id="frends-req">
                            <ul className="nearby-contct">
                                {activity.waitMembers && activity.waitMembers.map((member) => {
                                    return (
                                        <li key={member.id}>
                                            <div className="nearly-pepls">
                                                <figure>
                                                    <a href="" title><img src={member.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} style={{ width: 50, height: 50 }} alt="" /></a>
                                                </figure>
                                                <div className="pepl-info">
                                                    <h4><a href="">{member.user.name}</a></h4>
                                                    <span>Waiting for approval...</span>
                                                    {isAdmin() &&
                                                        (<>
                                                            <a href="" className="add-butn more-action"  onClick={(e) => {e.preventDefault(); clickLeave(member.id);}} >Delete Request</a>
                                                            <a
                                                                href=""
                                                                title="accept"
                                                                className="add-butn"
                                                                onClick={(e) => { e.preventDefault(); clickAcceptJoin({ activity_id: activity.id, user_id: member.id }) }}>
                                                                Confirm
                                                            </a>
                                                        </>)
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

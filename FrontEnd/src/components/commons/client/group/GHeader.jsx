import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { storage } from '../../../../firebase';
import { joinWaitActivity, unjoinActivity, updateCover } from '../../../../services';
import authToken from '../../../../utils/authToken';

export default function GHeader() {
    const { admin, activity } = useSelector(state => state.activity)
    const profile = useSelector(state => state.auth.profile)
    const dispatch = useDispatch()
    const [cover, setCover] = useState({ activity_id: activity.id, cover: activity.cover_url })
    const { id } = useParams()

    const isJoined = () => {
        if (activity.members) {
            for (var i = 0; i < activity.members.length; i++) {
                if (activity.members[i].id === profile.id) return true
            }
        }
        return false
    }

    const isWaitJoined = () => {
        if (activity.waitMembers) {
            for (var i = 0; i < activity.waitMembers.length; i++) {
                if (activity.waitMembers[i].id === profile.id) return true
            }
        }
        return false
    }

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    const imgSelected = (e) => {
        let image = e.target.files[0]
        const uploadTask = storage.ref(`activities/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setProgress(progress);
                console.log(progress)
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("activities")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setCover({
                            ...cover,
                            cover: url
                        })
                        alert("Update Cover successfully!")
                    })
            }
        )
    }

    var [secondUpdate, setSecondUpdate] = useState(0)
    useEffect(() => {
        setCover({
            ...cover,
            activity_id: activity.id,
            cover: activity.cover_url
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity.id])

    useEffect(() => {
        // console.log("secondUpdate: " + secondUpdate)
        if (secondUpdate < 3) {
            setSecondUpdate(++secondUpdate)
            return;
        }

        dispatch(updateCover(cover))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cover])

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
        }
    })

    const clickJoin = () => {
        dispatch(joinWaitActivity({ activity_id: activity.id, user_id: profile.id }))
            .then((resp) => {
                console.log(resp)
            })
    }

    const clickUnjoin = () => {
        dispatch(unjoinActivity({ activity_id: activity.id, user_id: profile.id }))
            .then((resp) => {
                console.log(resp)
            })
    }

    const showJoinButton = () => {
        return isWaitJoined() ? (<a href="/" onClick={(e) => { e.preventDefault(); clickUnjoin() }}>
            Waiting for approval
        </a>) : !isJoined() ? (<a href="/" onClick={(e) => { e.preventDefault(); clickJoin() }}>
            Join+
        </a>) : isAdmin() ?
            null : (<a href="/" onClick={(e) => { e.preventDefault(); clickUnjoin() }}>
                Leave
            </a>)
    }

    return (
        <>
            <section>
                <div className="feature-photo">

                    <figure>
                        <img onError={(e) => { e.target.src = "/assets/img/resources/default-cover.jpg" }} src={activity.cover_url} alt="" style={{ height: 500 }} />
                    </figure>

                    <div className="add-btn">
                        <span>{activity.members ? activity.members.length : '0'} Joiners</span>
                        {showJoinButton()}
                    </div>

                    {isAdmin() ? (<form className="edit-phto">
                        <i className="fa fa-camera-retro" />
                        <label className="fileContainer">
                            Edit Cover Photo
                            <input type="file" name='cover_url' onChange={imgSelected} accept="image/png, image/jpeg" />
                        </label>
                    </form>) : null}

                    <div className="container-fluid">
                        <div className="row merged">
                            <div className="col-lg-2 col-sm-3">
                            </div>
                            <div className="col-lg-10 col-sm-9">
                                <div className="timeline-info">
                                    <ul>
                                        <li className="admin-name">
                                            <h5>{activity.name}</h5>
                                            <span>{admin.email}</span>
                                        </li>
                                        <li>
                                            <NavLink exact to={"/group/" + id} activeClassName="active">
                                                Posts
                                            </NavLink>
                                            <NavLink  exact to={"/group/" + id + "/qa"} activeClassName="active" >
                                                Q & A
                                            </NavLink>
                                            <NavLink exact to={"/group/members/" + id} activeClassName="active">
                                                Members
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux';
import { storage } from "../../../../firebase/index";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from './../../../../services/user/auth/authAction';
import { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Header() {
    const profile = useSelector(state => state.auth.profile);
    const otherUser = useSelector(state => state.user.user);
    const [userInfo, setUserInfo] = useState(profile)
    const updateImg = useRef(false);
    const { profile_username } = useParams()

    const dispatch = useDispatch()

    const imgSelected = (e) => {
        let image = e.target.files[0]
        const { name } = e.target;
        const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
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
                    .ref("profiles")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUserInfo({ ...userInfo, [name]: url })
                        updateImg.current = true
                    })
            }
        )
    }

    useEffect(() => {
        if (profile_username) {
            setUserInfo({...otherUser})
        } else {
            setUserInfo({...profile})
        }
    }, [otherUser, profile, profile_username])

    useEffect(() => {
        if (updateImg.current) {
            updateImg.current = false;
            if(!profile_username)
            dispatch(updateProfile(userInfo)).then((response) => {
                alert("Update profile successfully")
            })
            .catch((error) => {
                alert("Error when saving!")
            });
            return;
        }
    }, [userInfo, profile_username, dispatch]);

    const isMine = () => {
        return profile_username === undefined || profile_username === profile.username
    }

    return (
        <>
            {console.log(profile)}
            <section>
                <div className="feature-photo">
                    <figure>
                        <img src={userInfo.cover_url ? userInfo.cover_url : "/assets/img/resources/timeline-1.jpg"} alt="" style={{ height: 500 }} />
                    </figure>
                    {
                        isMine() && <form className="edit-phto">
                            <i className="fa fa-camera-retro" />
                            <label className="fileContainer">
                                Edit Cover Photo
                                <input type="file" name='cover_url' onChange={imgSelected} accept="image/png, image/jpeg" />
                            </label>
                        </form>
                    }
                    <div className="container-fluid">
                        <div className="row merged">
                            <div className="col-lg-2 col-sm-3">
                                <div className="user-avatar">
                                    <figure>
                                        <img alt="Image placeholder" src={userInfo.avatar_url ? userInfo.avatar_url : "/assets/img/theme/Default-avatar.jpg"} style={{ width: 170, height: 170 }} />
                                        {
                                            isMine() && <form className="edit-phto">
                                                <i className="fa fa-camera-retro" />
                                                <label className="fileContainer">
                                                    Edit Display Photo
                                                    <input type="file" name='avatar_url' onChange={imgSelected} accept="image/png, image/jpeg" />
                                                </label>
                                            </form>
                                        }
                                    </figure>
                                </div>
                            </div>
                            <div className="col-lg-10 col-sm-9">
                                <div className="timeline-info">
                                    <ul>
                                        <li className="admin-name">
                                            <h5>{userInfo.name}</h5>
                                            <span>User</span>
                                        </li>
                                        <li>
                                            <NavLink exact to={"/profile"} activeClassName="active">
                                                Information
                                            </NavLink>
                                            <a className href="timeline-friends.html" title data-ripple>
                                                Followers
                                            </a>
                                            <a className href="groups.html" title data-ripple>
                                                Activities
                                            </a>
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

/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function SHeader() {
    const userInfo = useSelector(state => state.user.user);

    return (
        <>
            <section>
                <div className="feature-photo">
                    <figure>
                        <img src={userInfo.cover_url ? userInfo.cover_url : "/assets/img/resources/timeline-1.jpg"} alt="" style={{ height: 500 }}/>
                    </figure>
                    <div className="container-fluid">
                        <div className="row merged">
                            <div className="col-lg-2 col-sm-3">
                                <div className="user-avatar">
                                    <figure>
                                        <img src={userInfo.avatar_url ? userInfo.avatar_url : "/assets/img/theme/Default-avatar.jpg"} style={{ width: 170, height: 170 }} />
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
                                            <NavLink exact to={"/profile/" + userInfo.username} activeClassName="active">
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
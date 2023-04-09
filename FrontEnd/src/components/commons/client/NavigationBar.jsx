/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../services';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function NavigationBar() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.auth.profile);
    let history = useHistory();
    const { con } = useParams()
    const [content, setContent] = useState(con || "")
    useEffect(() => {
        if(con) setContent(con)
    }, [con])
    const logout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        // dispatch(fetchActivites())
    }, [dispatch])

    return (
        <>
            <div className="postoverlay" />
            <div className="responsive-header">
                <div className="mh-head first Sticky">
                    <span className="mh-text">
                        <a href="newsfeed.html"><img src="/assets/img/logo2.png" alt="" /></a>
                    </span>
                </div>
                <div className="mh-head second">
                    <form
                        className="mh-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            // e.stopPropagation();
                            let link = "/search/top/" + content
                            history.push(link);
                        }}
                    >
                        <input placeholder="search" defaultValue={content} onChange={(e) => { setContent(e.target.value) }} />
                        <a
                            href="#/"
                            className="fa fa-search"
                            onClick={(e) => {
                                e.preventDefault();
                                // e.stopPropagation();
                                let link = "/search/top/" + content
                                history.push(link);
                            }}
                        />
                    </form>
                </div>
            </div>{/* responsive header */}
            <div className="topbar stick">
                <div className="logo">
                    <Link to="/" title="Home" data-ripple><img src="/assets/img/logo.png" alt="" /></Link>
                    {/* <a title href="newsfeed.html"><img src="/assets/img/logo.png" alt="" /></a> */}
                </div>
                <div className="top-area">
                    <div className="top-search">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // e.stopPropagation();
                                let link = "/search/top/" + content
                                history.push(link);
                            }}
                        >
                            <input type="text" placeholder="Search" defaultValue={content} onChange={(e) => { setContent(e.target.value) }} />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // e.stopPropagation();
                                    let link = "/search/top/" + content
                                    history.push(link);
                                }}>
                                <i className="ti-search" />
                            </button>
                        </form>
                    </div>
                    <ul className="setting-area">
                        <li><a href="/" title="Home" data-ripple><i className="ti-home" /></a></li>
                        <li>
                            <a href="#" title="Notification" data-ripple>
                                <i className="ti-bell" /><span>20</span>
                            </a>
                            <div className="dropdowns">
                                <span>4 New Notifications</span>
                                <ul className="drops-menu">
                                    <li>
                                        <a href="notifications.html">
                                            <img src="/assets/img/resources/thumb-1.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>sarah Loren</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag green">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html">
                                            <img src="/assets/img/resources/thumb-2.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Jhon doe</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag red">Reply</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html">
                                            <img src="/assets/img/resources/thumb-3.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Andrew</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag blue">Unseen</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html">
                                            <img src="/assets/img/resources/thumb-4.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Tom cruse</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag">New</span>
                                    </li>
                                    <li>
                                        <a href="notifications.html">
                                            <img src="/assets/img/resources/thumb-5.jpg" alt="" />
                                            <div className="mesg-meta">
                                                <h6>Amy</h6>
                                                <span>Hi, how r u dear ...?</span>
                                                <i>2 min ago</i>
                                            </div>
                                        </a>
                                        <span className="tag">New</span>
                                    </li>
                                </ul>
                                <a href="notifications.html" className="more-mesg">view more</a>
                            </div>
                        </li>
                    </ul>
                    <div className="user-img">
                        <img alt="" src={profile.avatar_url || "/assets/img/theme/Default-avatar.jpg"} style={{ width: 42, height: 42 }} />
                        <div className="user-setting">
                            <Link to={"/profile"}>
                                <i className="ti-user" /> view profile
                            </Link>
                            <Link to={"/login"} onClick={logout}>
                                <i className="ti-power-off" />log out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>{/* topbar */}
        </>
    )
}

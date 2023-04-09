/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function RsideBar() {
    const profile = useSelector(state => state.auth.profile);
    return (
        <div className="col-lg-3">
            <aside className="sidebar static right">
                <div className="widget">
                    <h4 className="widget-title">Your Achivements</h4>
                    <div className="your-page">
                        <figure>
                            <Link to="/" title><img alt="Image placeholder" src={profile.avatar_url ? profile.avatar_url : "../assets/img/theme/Default-avatar.jpg"} style={{width: 50, height: 50}}/></Link>
                        </figure>
                        <div className="page-meta">
                            <Link to="/" title className="underline">{profile.name}</Link>
                        </div>
                        <div className="page-likes">
                            <ul className="nav nav-tabs likes-btn">
                                <li className="nav-item"><a className="active" href="#link1" data-toggle="tab">Activity points</a></li>
                                <li className="nav-item"><a className href="#link2" data-toggle="tab">Reputation</a></li>
                            </ul>
                            {/* Tab panes */}
                            <div className="tab-content">
                                <div className="tab-pane active fade show " id="link1">
                                    <span><i className="ti-heart" />{profile.acp || 0}</span>
                                </div>
                                <div className="tab-pane fade" id="link2">
                                    <span><i className="ti-heart" />{profile.rep || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* page like widget */}
                <div className="widget stick-widget">
                    <h4 className="widget-title">Profile intro</h4>
                    <ul className="short-profile">
                        <li>
                            <span>about</span>
                            {profile.about || <p>Can you edit profile to show about you</p>}
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

import React from 'react'
import { useSelector } from 'react-redux';

export default function RSideBar() {
    const profile = useSelector(state => state.auth.profile);

    return (
        <aside className="sidebar static right">
            <div className="widget">
                <h4 className="widget-title">Achivements</h4>
                <div className="your-page">
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
        </aside>
    )
}

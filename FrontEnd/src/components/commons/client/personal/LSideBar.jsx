import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../services';
import { Link, useParams } from 'react-router-dom';

export default function LSideBar() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.auth.profile);
    const {profile_username} = useParams()

    const logout = () => {
        dispatch(logoutUser());
    };

    const isMine = () => {
        return profile_username === undefined || profile_username === profile.username
    }

    return (
        <aside className="sidebar static">
            <div className="widget">
                <h4 className="widget-title">Profile intro</h4>
                <ul className="short-profile">
                    <li>
                        <span>about</span>
                        <p>
                            {profile.about || <p>Hi, my name is {profile.name}</p>}
                        </p>
                    </li>
                </ul>
            </div>
            {/* profile intro widget */}
            {isMine() && <div className="widget stick-widget">
                <h4 className="widget-title">Edit info</h4>
                <ul className="naves">
                    <li>
                        <i className="ti-settings" />
                        <a href="/" title>
                            account setting
                        </a>
                    </li>
                    <li>
                        <i className="ti-lock" />
                        <Link to={"/edit-password"} title="Change My password">
                            change password
                        </Link>
                    </li>
                    <li>
                        <i className="ti-power-off" />
                        <Link to={"/login"} title="Logout My account" onClick={logout}>log out</Link>
                    </li>
                </ul>
            </div>}
        </aside>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../services';

export default function LSideBar() {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="col-lg-3">
            <aside className="sidebar static left">
                <div className="widget">
                    <h4 className="widget-title">Shortcuts</h4>
                    <ul className="naves">
                        <li>
                            <i className="ti-clipboard" />
                            <Link to="/" title="Go to my News feed">News feed</Link>
                        </li>
                        <li>
                            <i className="ti-files" />
                            <Link to="/" title="Go to your My activies">Activies</Link>
                        </li>
                        <li>
                            <i className="ti-user" />
                            <Link to="/" title="Go to your My following">Following</Link>
                        </li>
                        <li>
                            <i className="ti-power-off" />
                            <Link to={"/login"} title="Logout My account" onClick={logout}>log out</Link>
                        </li>
                    </ul>
                </div>{/* Shortcuts */}
            </aside>
        </div>

    )
}

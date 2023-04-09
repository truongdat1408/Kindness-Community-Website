/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function SideBar() {
    return (
        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
            <div className="scrollbar-inner">
                {/* Brand */}
                <div className="sidenav-header  align-items-center">
                    <a className="navbar-brand" href="#">
                        <img src="../assets/img/brand/blue.png" className="navbar-brand-img" alt="..." />
                    </a>
                </div>
                <div className="navbar-inner">
                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                        {/* Nav items */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={"/admin/home"} activeClassName="active">
                                    <i className="ni ni-shop text-primary" />
                                    <span className="nav-link-text">Home</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={"/admin/users"} activeClassName="active">
                                    <i className="ni ni-single-02 text-orange" />
                                    <span className="nav-link-text">Users</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="map.html">
                                    <i className="ni ni-ui-04 text-green" />
                                    <span className="nav-link-text">User Roles</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="profile.html">
                                    <i className="ni ni-world text-yellow" />
                                    <span className="nav-link-text">Activities</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="tables.html">
                                    <i className="ni ni-bullet-list-67 text-default" />
                                    <span className="nav-link-text">Posts</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" exact to={"/admin/profile"} activeClassName="active">
                                    <i className="ni ni-circle-08 text-info" />
                                    <span className="nav-link-text">Profile</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import ApplicationConstant from '../../constants/ApplicationConstant';
import { logoutUser } from '../../services/index';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import authToken from '../../utils/authToken';

export default function NavigationBar() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);

  const guestLinks = (
    <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="dashboard.html">
          <img src="../assets/img/brand/white.png" alt='' />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
          <div className="navbar-collapse-header">
            <div className="row">
              <div className="col-6 collapse-brand">
                <a href="dashboard.html">
                  <img src="../assets/img/brand/blue.png" alt='' />
                </a>
              </div>
              <div className="col-6 collapse-close">
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <span className="nav-link-inner--text">Login</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <span className="nav-link-inner--text">Register</span>
              </Link>
            </li>
          </ul>
          <hr className="d-lg-none" />
        </div>
      </div>
    </nav>
  )

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      authToken(localStorage.getItem('jwtToken'))
    }
  }, [dispatch])

  function SwitchCase() {
    const urls = ApplicationConstant.urls
    switch (window.location.pathname) {
      case urls.ADHOME:
      case urls.USERS:
      case urls.PROFILE:
        return (
          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav align-items-center  ml-md-auto ">
                  <li className="nav-item d-xl-none">
                    {/* Sidenav toggler */}
                    <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                      </div>
                    </div>
                  </li>
                  <li className="nav-item d-sm-none">
                    {/* <a className="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                        <i className="ni ni-zoom-split-in" />
                      </a> */}
                  </li>
                </ul>
                <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                  <li className="nav-item dropdown">
                    <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          <img alt="Image placeholder" src={profile.avatar_url ? profile.avatar_url : "../assets/img/theme/Default-avatar.jpg"} style={{width: 38, height: 38}}/>
                        </span>
                        <div className="media-body  ml-2  d-none d-lg-block">
                          <span className="mb-0 text-sm  font-weight-bold">{profile.name}</span>
                        </div>
                      </div>
                    </a>
                    <div className="dropdown-menu  dropdown-menu-right ">
                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome {profile.name}!</h6>
                      </div>
                      <Link to={"/admin/profile"} className="dropdown-item">
                        <i className="ni ni-single-02" />
                        <span>My profile</span>
                      </Link>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-settings-gear-65" />
                        <span>Settings</span>
                      </a>
                      <div className="dropdown-divider" />
                      <Link to={"/login"} className="dropdown-item" onClick={logout}>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
      case urls.LOGIN:
      case urls.REGISTER:
      default: return guestLinks;
    }
  }
  return (
    <>
      {SwitchCase()}
    </>
  )
}

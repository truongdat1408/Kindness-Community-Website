import React from 'react'
import ApplicationConstant from '../../constants/ApplicationConstant';
import { useSelector } from 'react-redux';

export default function Header() {
    const users = useSelector(state => state.user.users);
    const { activities } = useSelector(state => state.activity)
    const { posts } = useSelector(state => state.post)
    const homeAdLink = (
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Total Activities</h5>
                                <span className="h2 font-weight-bold mb-0">{activities ? activities.length : 0}</span>
                            </div>
                            <div className="col-auto">
                                <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                    <i className="ni ni-active-40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">New users</h5>
                                <span className="h2 font-weight-bold mb-0">{users ? users.length : 0}</span>
                            </div>
                            <div className="col-auto">
                                <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                    <i className="ni ni-chart-pie-35" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card card-stats">
                    {/* Card body */}
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title text-uppercase text-muted mb-0">Posts</h5>
                                <span className="h2 font-weight-bold mb-0">{posts ? posts.length : 0}</span>
                            </div>
                            <div className="col-auto">
                                <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                    <i className="ni ni-chart-bar-32" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    function SwitchCase(){
        const urls = ApplicationConstant.urls
        switch(window.location.pathname){
            case urls.ADHOME: return homeAdLink;
            default:break;
        }
    }
    return (
        <div className="header bg-primary pb-6">
            <div className="container-fluid">
                <div className="header-body">
                    <div className="row align-items-center py-4">
                        <div className="col-lg-6 col-7">
                            <h6 className="h2 text-white d-inline-block mb-0">Default</h6>
                            <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                    <li className="breadcrumb-item"><a href="fb" ><i className="fas fa-home" /></a></li>
                                    <li className="breadcrumb-item"><a href="fb">Home</a></li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-6 col-5 text-right d-none">
                            <a href="fb" className="btn btn-sm btn-neutral">New</a>
                        </div>
                    </div>
                    {/* Card stats */}
                    {SwitchCase()}
                </div>
            </div>
        </div>
    )
}

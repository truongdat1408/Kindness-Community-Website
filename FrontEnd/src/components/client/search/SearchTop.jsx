/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import authToken from '../../../utils/authToken';
import changeTimeFormat from '../../../pages/commonFunc/changeTimeFormat';

export default function SearchTop() {
    const { con } = useParams()
    const listPosts = useSelector(state => state.post.filListPosts)
    const activites = useSelector(state => state.activity.acts);

    const [filteredActivities, setFilteredActivities] = useState(() => {
        if (con && activites)
            return activites.filter((act) => act.name && act.contactName && (act.name.toLowerCase().includes(con.toLowerCase()) || act.contactName.toLowerCase().includes(con.toLowerCase())))
        return []
    })
    const [filteredPosts, setFilteredPosts] = useState(() => {
        if (con)
            return listPosts.filter((post) => post.content.toLowerCase().includes(con.toLowerCase()))
        return []
    })

    useEffect(() => {
        if (con && activites !== []) {
            console.log("Activities");
            console.log(activites)
            console.log("listPosts");
            console.log(listPosts);
            let filactivities = activites.filter((act) => act.name.toLowerCase().includes(con.toLowerCase()) || act.contactName.toLowerCase().includes(con.toLowerCase()))
            setFilteredActivities(filactivities)
        }

    }, [activites, con, listPosts])

    useEffect(() => {
        setFilteredPosts(con && listPosts !== [] ? listPosts.filter((post) => post.content.toLowerCase().includes(con.toLowerCase())) : [])
    }, [con, listPosts])

    if (localStorage.getItem('jwtToken')) {
        authToken(localStorage.getItem('jwtToken'))
    }

    return (
        <>
            <div className="col-lg-8">
                <div className="central-meta">
                    <div className="frnds">
                        <ul className="nav nav-tabs">
                            <li className="nav-item"><a className="active" href="#frends" data-toggle="tab">Activities</a> <span>{filteredActivities.length || 0}</span></li>
                            <li className="nav-item"><a className href="#frends-req" data-toggle="tab">Posts</a><span>{filteredPosts.length || 0}</span></li>
                        </ul>

                        {/* Tab panes */}
                        <div className="tab-content">
                            <div className="tab-pane active fade show " id="frends">
                                <ul className="nearby-contct">
                                    {filteredActivities
                                        .map((activity) =>
                                            <li>
                                                <div className="nearly-pepls">
                                                    <figure>
                                                        <a href="time-line.html" title>
                                                            <img onError={(e) => { e.target.src = "/assets/img/resources/group1.jpg" }} src={"/assets/img/resources/group1.jpg"} alt="" style={{ width: 50, height: 50 }} />
                                                        </a>
                                                    </figure>
                                                    <div className="pepl-info">
                                                        <h4>
                                                            <a href={"/group/" + activity.id} title>
                                                                {activity.name}
                                                            </a>
                                                        </h4>
                                                        <span className='mb-1'><b>Members:</b> {activity.memberNumber}</span>
                                                        <span className='mb-1'><b>Address:</b> {activity.address}</span>
                                                        <span className='mb-1'><b>Start Date:</b> {activity.sDate}</span>
                                                        <span><b>Start Time:</b> {activity.sTime}</span>
                                                        <a href={"/group/" + activity.id} className="add-butn">
                                                            Details
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>)}
                                </ul>
                            </div>

                            <div className="tab-pane fade" id="frends-req">
                                {filteredPosts.map((post) =>
                                    <div className="central-meta item mt-4">
                                        <div className="user-post">
                                            <div className="friend-info">
                                                <figure>
                                                    <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={post.userInfo.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 50, height: 50 }} />
                                                </figure>
                                                <div className="friend-name">
                                                    <ins>
                                                        <a href="time-line.html" title>
                                                            {post.userInfo.user.name}
                                                        </a>
                                                        <span> >> </span>
                                                        <Link to={"/group/" + post.activity.id}>
                                                            {post.activity.name}
                                                        </Link>
                                                    </ins>
                                                    <span>
                                                        <Link to={"/group/" + post.activity.id + "/post/" + post.id}>
                                                            published: {changeTimeFormat(post.createdAt)}
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="post-meta">
                                                    {post.image ? <img src={post.image} alt="" style={{ width: 600, height: 450 }} /> : null}
                                                    <div className="description">
                                                        <p>
                                                            {post.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

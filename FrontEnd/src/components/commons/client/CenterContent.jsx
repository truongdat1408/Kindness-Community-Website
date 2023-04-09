/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchActivites } from '../../../services';
import authToken from './../../../utils/authToken';

export default function CenterContent() {
    const profile = useSelector(state => state.auth.profile);
    const activites = useSelector(state => state.activity.activities);
    const history = useHistory();

    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            authToken(localStorage.getItem('jwtToken'))
        }
        dispatch(fetchActivites())
    }, [dispatch])

    return (
        <div className="col-lg-6">
            {console.log(activites)}
            <div className="central-meta new-pst">
                <div className="new-postbox">
                    <figure>
                        <Link to="/" title><img alt="Image placeholder" src={profile.avatar_url ? profile.avatar_url : "../assets/img/theme/Default-avatar.jpg"} style={{ width: 50, height: 50 }} /></Link>
                    </figure>
                    <div className="newpst-input">
                        <form method="post">
                            {/* <textarea rows={2} placeholder="write something" defaultValue={""} /> */}
                            <div className="attachments">
                                <ul>
                                    <li>
                                        <button type="button" onClick={() => history.push(`/create-activity`)}>Create Activity</button>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>{/* add post new box */}
            <div className="loadMore">
                <div className="central-meta item">
                    <div className="groups">
                        <span>
                            <i className="fa fa-users" /> New Activities
                        </span>
                    </div>
                    <ul className="nearby-contct">
                        {activites.slice(0, 3).map((activity) => {
                            return (
                                <li key={activity.id}>
                                    <div className="nearly-pepls">
                                        <figure>
                                            <a href="time-line.html" title>
                                                <img onError={(e) => {e.target.src = "../assets/img/resources/group1.jpg"}} src={activity.cover_url} alt="" style={{width: 50, height: 50}}/>
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
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="central-meta item">
                    <div className="user-post">
                        <div className="friend-info">
                            <figure>
                                <img src="../assets/img/theme/Default-avatar.jpg" alt="" />
                            </figure>
                            <div className="friend-name">
                                <ins><a href="time-line.html" title>Janice Griffith</a></ins>
                                <span>published: june,2 2018 19:PM</span>
                            </div>
                            <div className="post-meta">
                                <img src="../assets/img/theme/Default-avatar.jpg" alt="" style={{ width: 200, height: 200 }} />
                                <div className="we-video-info">
                                    <ul>
                                        <li>
                                            <span className="views" data-toggle="tooltip" title="views">
                                                <i className="fa fa-eye" />
                                                <ins>1.2k</ins>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="comment" data-toggle="tooltip" title="Comments">
                                                <i className="fa fa-comments-o" />
                                                <ins>52</ins>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="like" data-toggle="tooltip" title="like">
                                                <i className="ti-heart" />
                                                <ins>2.2k</ins>
                                            </span>
                                        </li>
                                        <li className="social-media">
                                            <div className="menu">
                                                <div className="btn trigger"><i className="fa fa-share-alt" /></div>
                                                <div className="rotater">
                                                    <div className="btn btn-icon"><Link to={"/"} title><i className="fa fa-facebook" /></Link></div>
                                                </div>
                                                <div className="rotater">
                                                    <div className="btn btn-icon"><Link to={"/"} title><i className="fa fa-google-plus" /></Link></div>
                                                </div>
                                                <div className="rotater">
                                                    <div className="btn btn-icon"><Link to={"/"} title><i className="fa fa-twitter" /></Link></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="description">
                                    <p>
                                        World's most beautiful car in Curabitur <Link to={"/"} title>#test drive booking !</Link> the most beatuiful car available in america and the saudia arabia, you can book your test drive by our official website
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

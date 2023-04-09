/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnswersByActivityId, getAllQuestionsByActivityId, logoutUser } from '../../../../services';
import { useEffect } from 'react';
import changeTimeFormat from '../../../../pages/commonFunc/changeTimeFormat';

export default function GLSideBar() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser());
    };
    const { questions } = useSelector(state => state.qa)

    useEffect(() => {
        dispatch(getAllQuestionsByActivityId(id))
        dispatch(getAllAnswersByActivityId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <aside className="sidebar static">
                <div className="widget">
                    <h4 className="widget-title">Shortcuts</h4>
                    <ul className="naves">
                        <li>
                            <i className="ti-clipboard" />
                            <Link exact to={"/group/" + id}>
                                News feed
                            </Link>
                        </li>
                        <li>
                            <i className="ti-settings" />
                            <Link exact to={"/group/" + id + "/settings"}>
                                Settings
                            </Link>
                        </li>
                        <li>
                            <i className="ti-user" />
                            <Link exact to={"/group/members/" + id}>
                                Members
                            </Link>
                        </li>
                        <li>
                            <i className="ti-comments-smiley" />
                            <Link exact to={"/group/" + id + "/qa"}>
                                Questions
                            </Link>
                        </li>
                        <li>
                            <i className="ti-power-off" />
                            <Link to={"/login"} title="Logout My account" onClick={logout}>log out</Link>
                        </li>
                    </ul>
                </div>
                {/* Shortcuts */}
                <div className="widget">
                    <h4 className="widget-title">Recent Questions</h4>
                    <ul className="activitiez">
                        {
                            questions.slice(0, 3).map((question) =>
                                <li key={question.id}>
                                    <div className="activity-meta">
                                        <i>{question.createdAt === question.updatedAt ? changeTimeFormat(question.createdAt) : changeTimeFormat(question.updatedAt)}</i>
                                        <span>
                                            <a href="time-line.html">
                                                {question.content}
                                            </a>
                                        </span>
                                        <h6>
                                            <span>by </span> 
                                            <Link to={"/profile/" + question.userInfo.user.username}>
                                                {question.userInfo.user.name || question.userInfo.user.username}
                                             </Link>
                                        </h6>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
                {/* recent activites */}
            </aside>
        </>
    )
}

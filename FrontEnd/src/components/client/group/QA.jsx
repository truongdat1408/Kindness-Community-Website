import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import {
    getAllQuestionsByActivityId,
    getAllAnswersByActivityId,
    createQuestion,
    createAnswer,
    editQuestionApi,
    deleteQuestion
} from './../../../services/qa/qaAction';
import changeTimeFormat from './../../../pages/commonFunc/changeTimeFormat';
import Answer from '../../commons/client/answer/Answer';
import AnswerForm from '../../commons/client/answer/AnswerForm';

export default function QA() {
    const profile = useSelector(state => state.auth.profile)
    const { questions, answers } = useSelector(state => state.qa)
    const { admin, activity } = useSelector(state => state.activity)
    const { id } = useParams()
    const dispatch = useDispatch()
    const [filteredQuestions, setFilteredQuestions] = useState(questions)
    const [filteredAnswers, setFilteredAnswers] = useState(answers)
    const [editQuestion, setEditQuestion] = useState()

    const initQuestion = {
        user_id: profile.id,
        content: "",
        activity_id: id
    }
    const [quest, setQuestion] = useState(initQuestion)

    useEffect(() => {
        dispatch(getAllQuestionsByActivityId(id))
        dispatch(getAllAnswersByActivityId(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        setFilteredQuestions(questions.map((question) => ({ ...question, answersToShow: 2, showMoreLine: true, showEdit: false })))
    }, [questions])

    useEffect(() => {
        setFilteredAnswers(answers.map((answer) => ({ ...answer, showEdit: false })))
    }, [answers])

    const resetFilteredQuestions = () => {
        setFilteredQuestions(filteredQuestions.map((question) => ({ ...question })))
    }

    const resetFilteredAnswers = () => {
        setFilteredAnswers(filteredAnswers.map((answer) => ({ ...answer })))
    }

    const showMore = (e, questionId) => {
        e.preventDefault();
        for (var i = 0; i < filteredQuestions.length; i++) {
            if (filteredQuestions[i].id === questionId) {
                filteredQuestions[i].answersToShow = 1000
                filteredQuestions[i].showMoreLine = false
                break;
            }
        }
        resetFilteredQuestions()
        resetFilteredAnswers()
    }

    const isJoined = () => {
        if (activity.members) {
            for (var i = 0; i < activity.members.length; i++) {
                if (activity.members[i].id === profile.id) return true
            }
        }
        return false
    }

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    const submitAnswer = (content, id) => {
        console.log("Content: " + content + ", id: " + id)
        let answerReq = {
            question_id: id,
            user_id: profile.id,
            content: content
        }
        dispatch(createAnswer(answerReq)).then((response) => {
            resetFilteredAnswers()
        })
        console.log("Done!");
    }

    const handlePost = () => {
        dispatch(createQuestion(quest)).then((response) => {
            setQuestion(initQuestion);
            resetFilteredQuestions();
        })

    }

    const isNotChange = () => {
        return JSON.stringify(initQuestion) === JSON.stringify(quest)
    }

    const clickEditQuestion = () => {
        dispatch(editQuestionApi(editQuestion)).then((resp) => {
            setEditQuestion({ content: "", question_id: null })
        }).catch((error) => {
            setEditQuestion({ content: "", question_id: null })
        })
    }

    const clickDeleteQuestion = (question_id) => {
        dispatch(deleteQuestion(question_id)).then((res) => {
            dispatch(getAllQuestionsByActivityId(id))
        }).catch((error) => {
            dispatch(getAllQuestionsByActivityId(id))
        })
    }

    return (
        <>

            {isJoined() && <div className="central-meta new-pst">
                <div className="new-postbox">
                    <figure>
                        <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={profile.avatar_url || "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 50, height: 50 }} />
                    </figure>
                    <div className="newpst-input">
                        <form method="post">
                            <textarea
                                rows={3}
                                placeholder="write something"
                                value={quest.content}
                                name='content'
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    setQuestion({ ...quest, [name]: value })
                                }}
                            />

                            <div className="attachments">
                                <ul>
                                    <li>
                                        {!isNotChange() && <button type="button" onClick={handlePost} >Post</button>}
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>

                </div>
            </div>}

            {isJoined() ? filteredQuestions.map((question) => (
                <div className="central-meta item">
                    <div className="user-post">
                        <div className="friend-info">
                            <figure>
                                <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={question.userInfo.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 50, height: 50 }} />
                            </figure>
                            <div className="friend-name">
                                <ins>
                                    <Link to={"/profile/" + question.userInfo.user.username}>
                                        {question.userInfo.user.name || question.userInfo.user.username}
                                    </Link>
                                </ins>
                                <span>{question.createdAt === question.updatedAt ? "Published: " + changeTimeFormat(question.createdAt) : "Updated at " + changeTimeFormat(question.updatedAt)}</span>
                                {question.userInfo.id === profile.id ?
                                    <div className="more">
                                        <div className="more-post-optns">
                                            <i className="ti-more-alt" />
                                            <ul>
                                                <li onClick={() => { question.showEdit = true; resetFilteredQuestions(); setEditQuestion({ ...editQuestion, content: question.content, question_id: question.id }) }}>
                                                    <i className="fa fa-pencil-square-o" />
                                                    Edit
                                                </li>
                                                <li onClick={(e) => { clickDeleteQuestion(question.id) }}>
                                                    <i className="fa fa-trash"></i>
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    isAdmin() &&
                                    <div className="more">
                                        <div className="more-post-optns">
                                            <i className="ti-more-alt" />
                                            <ul>
                                                <li onClick={(e) => { clickDeleteQuestion(question.id) }}>
                                                    <i className="fa fa-trash"></i>
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>

                            {/*//////////////////  SHOW EDIT FORM  /////////////////*/}
                            <div className="post-meta">
                                <div className="description">
                                    {
                                        question.showEdit ?
                                            <div className="newpst-input">
                                                <form method="post">
                                                    <textarea
                                                        rows={3}
                                                        placeholder="write something"
                                                        defaultValue={question.content}
                                                        name='content'
                                                        onChange={(e) => {
                                                            const { name, value } = e.target;
                                                            setEditQuestion({ ...editQuestion, [name]: value.trim() });
                                                        }}
                                                    />
                                                    <div className="attachments">
                                                        <ul>
                                                            {/* Edit POST here  */}
                                                            <li>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        question.showEdit = false;
                                                                        resetFilteredQuestions()
                                                                        if (editQuestion.content !== question.content) {
                                                                            setEditQuestion({ ...editQuestion, question_id: question.id });
                                                                            clickEditQuestion()
                                                                        }
                                                                    }}>
                                                                    OK
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className='ml-1'
                                                                    onClick={() => {
                                                                        question.showEdit = false;
                                                                        resetFilteredQuestions()
                                                                    }}>
                                                                    Cancel
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div> :
                                            <p>
                                                {question.content}
                                            </p>
                                    }
                                </div>
                            </div>
                        </div>

                        {/*/////////////////// ANSWER THE QUESTION HERE //////////////////// */}
                        <div className="coment-area">
                            <ul className="we-comet">
                                {/* Render Comments Component Here  */}
                                {filteredAnswers
                                    .filter(ans => ans.question.id === question.id)
                                    .slice(0, question.answersToShow)
                                    .map((ans) => {
                                        return (
                                            <Answer
                                                answer={ans}
                                                resetAnswerFunction={resetFilteredQuestions}
                                            />
                                        )
                                    })}

                                {question.showMoreLine && <li>
                                    <a href="!#" title className="showmore underline" onClick={(e) => showMore(e, question.id)}>
                                        more answers
                                    </a>
                                </li>}

                                <AnswerForm
                                    avatarUrl={profile.avatar_url || "/assets/img/theme/Default-avatar.jpg"}
                                    handleSubmit={submitAnswer}
                                    id={question.id}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            ))
                :
                <div className="central-meta">
                    <div className="about">
                        <div className="personal">
                            <h5 className="f-title"><i className="ti-info-alt" /> Activity Info</h5>
                            <p>
                                {activity.desc}
                            </p>
                        </div>
                        <div className="d-flex flex-row mt-2">
                            <ul className="nav nav-tabs nav-tabs--vertical nav-tabs--left">
                                <li className="nav-item">
                                    <a href="#basic" className="nav-link active" data-toggle="tab">Admin Info</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#work" className="nav-link" data-toggle="tab">Activity Details</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#interest" className="nav-link" data-toggle="tab">Time</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#lang" className="nav-link" data-toggle="tab">Number of Members</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="basic">
                                    <ul className="basics">
                                        <li><i className="ti-user" />{admin.name}</li>
                                        <li><i className="ti-map" />{admin.address}</li>
                                        <li><i className="ti-world" />{admin.about}</li>
                                        <li><i className="ti-mobile" />{isJoined() ? admin.phone : "[Join to see]"}</li>
                                        <li><i className="ti-email" />{isJoined() ? admin.email : "[Join to see]"}</li>
                                    </ul>
                                </div>

                                <div className="tab-pane fade" id="work" role="tabpanel">
                                    <div>
                                        <p><b>Address: </b>{activity.address}</p>
                                        <p><b>Contact name: </b>{activity.contactName}</p>
                                        <p><b>Phone: </b>{activity.phone}</p>
                                        <p><b>Email: </b>{activity.email}</p>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="interest" role="tabpanel">
                                    <ul className="basics">
                                        <li><b>Start Time:</b> {activity.sDate} at {activity.sTime}</li>
                                        <li><b>End Time:</b> {activity.eDate} at {activity.eTime}</li>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="lang" role="tabpanel">
                                    <ul className="basics">
                                        <li><b>Members:</b> {activity.members ? activity.members.length : null}/{activity.memberNumber}</li>
                                        <li><b>Number of people waiting for approval:</b> {!isJoined() ? "[Join to see]" : activity.waitMembers ? activity.waitMembers.length : 0}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

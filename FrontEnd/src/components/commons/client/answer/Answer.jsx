import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import changeTimeFormat from '../../../../pages/commonFunc/changeTimeFormat'
import { deleteAnswer, getAllAnswersByActivityId, editAnswerApi } from './../../../../services/qa/qaAction';
import { Link, useParams } from 'react-router-dom';

export default function Answer({ answer, resetAnswerFunction }) {

    const profile = useSelector(state => state.auth.profile)
    const { admin } = useSelector(state => state.activity)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [editAnswer, setEditAnswer] = useState()

    const clickDelete = (ans_id) => {
        console.log("delete: " + ans_id)
        console.log(id)
        dispatch(deleteAnswer(ans_id)).then((resp) => {
            dispatch(getAllAnswersByActivityId(id))
        })
    }

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    var showEdit = useRef(false)

    const clickEdit = (answer_id) => {
        console.log(editAnswer)
        dispatch(editAnswerApi(editAnswer)).then((resp) => {
            setEditAnswer({ answer_id: answer_id, content: null })
        }).catch((error) => {
            setEditAnswer({ answer_id: answer_id, content: null })
        })
    }

    return (
        <>
            <li key={answer.id}>
                <div className="comet-avatar">
                    <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={answer.userInfo.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 40, height: 40 }} />
                </div>
                <div className="we-comment">
                    <div className="coment-head">
                        <h5>
                            <Link to={"/profile/" + answer.userInfo.user.username}>
                                {answer.userInfo.user.name || answer.userInfo.user.username}
                            </Link>
                        </h5>
                        <span>{changeTimeFormat(answer.updatedAt)}</span>

                        <div className='d-flex justify-content-between'>
                            {showEdit.current ?
                                <div className="newpst-input">
                                    <form method="post">
                                        <textarea
                                            rows={3}
                                            placeholder="write something"
                                            defaultValue={answer.content}
                                            name='content'
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setEditAnswer({
                                                    ...editAnswer, [name]: value.trim(), answer_id: answer.id
                                                });
                                            }}
                                        />
                                        <div className="attachments">
                                            <ul>
                                                {/* Edit POST here  */}
                                                <li>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            showEdit.current = false
                                                            resetAnswerFunction();
                                                            if (answer.content !== editAnswer.content) {
                                                                setEditAnswer({
                                                                    ...editAnswer, answer_id: answer.id
                                                                });
                                                                clickEdit(answer.id)
                                                            }
                                                        }}>
                                                        OK
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                                :
                                <p>
                                    {answer.content}
                                </p>
                            }

                            {answer.userInfo.id === profile.id ?
                                !showEdit.current &&
                                (<div className="more-post-optns">
                                    <i className="ti-more-alt" />
                                    <ul className='pl-2'>
                                        <li onClick={() => { showEdit.current = true; setEditAnswer({ ...editAnswer, answer_id: answer.id, content: answer.content }); resetAnswerFunction(); }}>
                                            <i className="fa fa-pencil-square-o" />
                                            Edit
                                        </li>
                                        <li onClick={(e) => { clickDelete(answer.id) }}>
                                            <i className="fa fa-trash"></i>
                                            Delete
                                        </li>
                                    </ul>
                                </div>)
                                :
                                isAdmin() &&
                                <div className="more-post-optns">
                                    <i className="ti-more-alt" />
                                    <ul className='pl-2'>
                                        <li onClick={(e) => { clickDelete(answer.id) }}>
                                            <i className="fa fa-trash"></i>
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
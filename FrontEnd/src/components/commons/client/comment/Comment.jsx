/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import changeTimeFormat from './../../../../pages/commonFunc/changeTimeFormat';
import CommentForm from './CommentForm';
import { useDispatch } from 'react-redux';
import { createComment, deleteComment, getReplies, getRootComments } from '../../../../services';
import authToken from '../../../../utils/authToken';
import { Link } from 'react-router-dom';

export default function Comment({ comment, replies }) {
    const profile = useSelector(state => state.auth.profile)
    const [showCommentForm, setToggle] = useState(false)
    const dispatch = useDispatch()

    const submitReply = (content, id, parentId) => {
        dispatch(createComment({
            id: id,
            user_id: profile.id,
            parent_id: parentId,
            content: content
        })).then((response) => {
            dispatch(getRootComments())
            dispatch(getReplies())
        }).catch((error) => {
            dispatch(getRootComments())
            dispatch(getReplies())
            //console.log("ERROR Create Comment: " + error)
        })
        // await console.log("xin chao: " + getComm({id: 1}))
    }
    const handleClickReply = (e) => {
        e.preventDefault()
        setToggle(!showCommentForm)
    }

    if (localStorage.getItem('jwtToken')) {
        authToken(localStorage.getItem('jwtToken'))
    }

    const clickDelete = (id) => {
        dispatch(deleteComment(id)).then((response) => {
            dispatch(getRootComments())
            dispatch(getReplies())
        }).catch((error) => {
            dispatch(getRootComments())
            dispatch(getReplies())
            //console.log("ERROR Delete Comment: " + error)
        })
    }

    return (
        <>
            <li key={comment.id}>
                <div className="comet-avatar">
                    <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={comment.user.avatarUrl || "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 40, height: 40 }} />
                </div>
                <div className="we-comment">
                    <div className="coment-head">
                        <h5>
                            <Link to={"/profile/" + comment.user.user.username}>
                                {comment.user.user.name || comment.user.user.username}
                            </Link>
                        </h5>
                        <span>{changeTimeFormat(comment.updatedAt)}</span>
                        {comment.parent_id === null && <a className="we-reply" href="#" onClick={handleClickReply} title="Reply">
                            <i className="fa fa-reply" />
                        </a>}

                        <div className='d-flex justify-content-between'>
                            <p>
                                {comment.content}
                            </p>
                            {comment.user.user.id === profile.id ?
                                <div className="more-post-optns">
                                    <i className="ti-more-alt" />
                                    <ul className='pl-2'>
                                        <li>
                                            <i className="fa fa-pencil-square-o" />
                                            Edit
                                        </li>
                                        <li onClick={(e) => { clickDelete(comment.id) }}>
                                            <i className="fa fa-trash"></i>
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div className="more-post-optns">
                                    <i className="ti-more-alt" />
                                    <ul className='pl-2'>
                                        <li>
                                            <i className="fa fa-wpexplorer" />
                                            Report post
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>




                {/* Reply */}
                <ul>
                    {replies.length > 0 && replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            replies={[]}
                        />
                    ))}

                    {showCommentForm && <CommentForm
                        avatarUrl={profile.avatar_url || "/assets/img/theme/Default-avatar.jpg"}
                        handleSubmit={submitReply}
                        id={comment.post.id}
                        parentId={comment.id}
                    />}
                </ul>
            </li>
        </>
    )
}

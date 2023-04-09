import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { storage } from '../../../firebase';
import changeTimeFormat from '../../../pages/commonFunc/changeTimeFormat';
import { createComment, deletePost, editPostApi, getActivity, getAllByActivityId, getReplies, getRootComments, likePost } from '../../../services';
import Comment from '../../commons/client/comment/Comment';
import CommentForm from '../../commons/client/comment/CommentForm';

export default function SinglePost() {
    const { id, post_id } = useParams()

    const { rootComments, replies, listPosts } = useSelector(state => state.post)
    const profile = useSelector(state => state.auth.profile)
    const dispatch = useDispatch()
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getActivity(id))
            //Get all posts by id of activity
            dispatch(getAllByActivityId(id))
            //Get all comments
            dispatch(getRootComments())
            dispatch(getReplies())
            console.log("OK ne");
            firstUpdate.current = false
        }

    }, [dispatch, id, post_id])

    const initEditPost = {
        post_id: null,
        content: "",
        image: null
    }

    const [editPost, setEditPost] = useState(initEditPost)
    const [filteredPost, setFilteredPost] = useState(() => {
        if (listPosts) {
            for (let i = 0; i < listPosts.length; i++) {
                if (listPosts[i].id === parseInt(post_id)) {
                    let value = listPosts[i]
                    return ({ ...value, showEdit: false })
                }
            }
        }
    })

    useEffect(() => {
        if (listPosts.length > 0) {
            for (let i = 0; i < listPosts.length; i++) {
                if (listPosts[i].id === parseInt(post_id)) {
                    setFilteredPost(listPosts[i])
                    setEditPost({ ...filteredPost, showEdit: false })
                    return
                }
            }
        }

    }, [filteredPost, post_id, listPosts])

    const imgEditSelected = (e) => {
        let image = e.target.files[0]
        const { name } = e.target;
        const uploadTask = storage.ref(`posts/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // setProgress(progress);
                console.log(progress)
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("posts")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setEditPost({
                            ...editPost,
                            [name]: url
                        })
                    })
            }
        )
    }

    const clickDeletePost = (post_id) => {
        console.log(post_id)
        dispatch(deletePost(post_id)).then((r) => {
            dispatch(getAllByActivityId(id))
        })
    }

    const handleLike = (postId) => {
        dispatch(likePost({
            id: postId,
            user_id: profile.id
        })).then((response) => {
            console.log("ok like")
        }).catch((error) => {
            console.log("ERROR handle Like: " + error)
        })
    }

    const editted = useRef()
    useEffect(() => {
        if (editted.current) {
            console.log(editPost)
            dispatch(editPostApi(editPost)).then((r) => console.log("okay")).catch((error) => console.log(error))
            setEditPost(initEditPost)
            editted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editPost.post_id])

    const submitComment = (content, id, parentId) => {
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
        })
    }

    return (
        <>
            {<div className="central-meta item">
                <div className="user-post">
                    <div className="friend-info">
                        <figure>
                            <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={filteredPost !== [] ? filteredPost.userInfo.avatarUrl : "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 50, height: 50 }} />
                        </figure>
                        <div className="friend-name">
                            <ins>
                                <a href="time-line.html" title>
                                    {filteredPost.userInfo.user.name}
                                </a>
                            </ins>
                            <span>
                                <Link to={"/group/" + id + "/post/" + filteredPost.id}>
                                    published: {changeTimeFormat(filteredPost.createdAt)}
                                </Link>
                            </span>
                            {
                                filteredPost.userInfo.id === profile.id ?
                                    <div className="more">
                                        <div className="more-post-optns">
                                            <i className="ti-more-alt" />
                                            <ul>
                                                <li onClick={() => { filteredPost.showEdit = true; setEditPost({ ...editPost, content: filteredPost.content }); }}>
                                                    <i className="fa fa-pencil-square-o" />
                                                    Edit
                                                </li>
                                                <li onClick={(e) => { clickDeletePost(filteredPost.id) }}>
                                                    <i className="fa fa-trash"></i>
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    <div className="more">
                                        <div className="more-post-optns">
                                            <i className="ti-more-alt" />
                                            <ul>
                                                <li>
                                                    <i className="fa fa-wpexplorer" />
                                                    Report post
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className="post-meta">
                            {filteredPost.image ? <img src={filteredPost.image} alt="" style={{ width: 600, height: 450 }} /> : null}
                            <div className="description">
                                {
                                    filteredPost.showEdit ?
                                        <div className="newpst-input">
                                            <form method="post">
                                                <textarea
                                                    rows={3}
                                                    placeholder="write something"
                                                    defaultValue={filteredPost.content}
                                                    name='content'
                                                    onChange={(e) => {
                                                        const { name, value } = e.target;
                                                        setEditPost({ ...editPost, [name]: value.trim() });
                                                    }}
                                                />
                                                <div className="attachments">
                                                    <ul>
                                                        <li>
                                                            <i className="fa fa-image" />
                                                            <label className="fileContainer">
                                                                <input type="file" name='image' onChange={imgEditSelected} accept="image/png, image/jpeg" />
                                                            </label>
                                                        </li>

                                                        {/* Edit POST here  */}
                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    filteredPost.showEdit = false;
                                                                    setEditPost({ ...editPost, post_id: filteredPost.id });
                                                                    editted.current = true
                                                                }}>
                                                                OK
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <div className='d-inline-flex p-2'>
                                                        {editPost.image ? <img src={editPost.image} alt="" /> : null}
                                                    </div>
                                                </div>
                                            </form>
                                        </div> :
                                        <p>
                                            {filteredPost.content}
                                        </p>
                                }
                            </div>

                            <div className="we-video-info">
                                <ul>
                                    <li>
                                        <span className="like" data-toggle="tooltip" title="like" style={{ 'color': filteredPost.likes.some((obj) => obj.id === profile.id) ? 'red' : 'black' }}>
                                            <i className="ti-heart" onClick={(e) => handleLike(filteredPost.id)} />
                                            <ins>{filteredPost.likes.length || 0}</ins>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="coment-area">
                        <ul className="we-comet">
                            {/* Render Comments Component Here  */}
                            {rootComments
                                .filter(com => com.post.id === filteredPost.id)
                                .map((com) => {
                                    let filteredReply = replies.filter(rep => rep.parent_id === com.id)
                                    return (
                                        <Comment
                                            comment={com}
                                            replies={filteredReply}
                                        />
                                    )
                                })}

                            <CommentForm
                                avatarUrl={profile.avatar_url || "../assets/img/theme/Default-avatar.jpg"}
                                handleSubmit={submitComment}
                                id={filteredPost.id}
                                parentId={null}
                            />
                        </ul>
                    </div>
                </div>
            </div>}
        </>
    )
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { storage } from '../../../firebase';
import { createComment, createPost, deletePost, editPostApi, getReplies, getRootComments, likePost } from '../../../services';
import Comment from '../../commons/client/comment/Comment';
import CommentForm from '../../commons/client/comment/CommentForm';
import changeTimeFormat from './../../../pages/commonFunc/changeTimeFormat';
import { getAllByActivityId } from './../../../services/post/postAction';
import authToken from './../../../utils/authToken';

export default function ListPosts() {

    const { id } = useParams()
    const { admin, error, activity } = useSelector(state => state.activity)
    const profile = useSelector(state => state.auth.profile)
    const dispatch = useDispatch()

    const { posts, rootComments, replies } = useSelector(state => state.post)
    const [filPosts, setFilPosts] = useState(posts)

    const firstAdminIdUpdate = useRef(true);
    const history = useHistory()

    const initPost = {
        content: "",
        image: null,
        user_id: admin.id,
        activity_id: id
    }

    const isNotChange = () => {
        return JSON.stringify(initPost) === JSON.stringify(post)
    }

    const imgSelected = (e) => {
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
                        setPost({
                            ...post,
                            [name]: url
                        })
                    })
            }
        )
    }

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

    if (localStorage.getItem('jwtToken')) {
        authToken(localStorage.getItem('jwtToken'))
    }

    const [post, setPost] = useState(initPost)

    const initEditPost = {
        post_id: null,
        content: "",
        image: null
    }
    const [editPost, setEditPost] = useState(initEditPost)

    useEffect(() => {
        if (error) {
            history.push("/error")
        }

        if (admin.id && firstAdminIdUpdate.current) {
            setPost({ ...post, user_id: admin.id })
            firstAdminIdUpdate.current = false;
        }

    }, [admin.id, error, history, post])


    const handlePost = (e) => {
        dispatch(createPost(post)).then((response) => {
            setPost(initPost)
            dispatch(getAllByActivityId(id))
            history.go(0)
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

    const liked = useRef(false);
    useEffect(() => {
        if (liked.current) {
            setFilPosts(posts.map((post) => ({ ...post, commentToShow: 2, showMoreLine: true, showEdit: false })))
            liked.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts])

    useEffect(() => {
        setFilPosts(posts.map((post) => ({ ...post, commentToShow: 2, showMoreLine: true, showEdit: false })))

    }, [posts])

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


    const showMore = (e, postId) => {
        e.preventDefault();
        for (var i = 0; i < filPosts.length; i++) {
            if (filPosts[i].id === postId) {
                filPosts[i].commentToShow = 1000
                filPosts[i].showMoreLine = false
                break;
            }
        }
        setFilPosts(filPosts.map((post) => ({ ...post })))
    }

    const editted = useRef(false);
    useEffect(() => {
        if (editted.current) {
            console.log(editPost)
            dispatch(editPostApi(editPost)).then((r) => console.log("okay")).catch((error) => console.log(error))
            setEditPost(initEditPost)
            editted.current = false
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editPost.post_id])

    const isAdmin = () => {
        if (admin.id) {
            return admin.id === profile.id
        }
        return false
    }

    const clickDeletePost = (post_id) => {
        console.log(post_id)
        dispatch(deletePost(post_id)).then((r) => {
            dispatch(getAllByActivityId(id))
        })
    }

    const isJoined = () => {
        if (activity.members) {
            for (var i = 0; i < activity.members.length; i++) {
                if (activity.members[i].id === profile.id) return true
            }
        }
        return false
    }

    return (
        <>
            {isAdmin() ?
                <div className="central-meta new-pst">
                    <div className="new-postbox">
                        <figure>
                            <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={admin.avatar_url} alt="" style={{ width: 50, height: 50 }} />
                        </figure>
                        <div className="newpst-input">
                            <form method="post">
                                <textarea
                                    rows={3}
                                    placeholder="write something"
                                    value={post.content}
                                    name='content'
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setPost({ ...post, [name]: value });
                                    }}
                                />

                                <div className="attachments">
                                    <ul>
                                        <li>
                                            <i className="fa fa-image" />
                                            <label className="fileContainer">
                                                <input type="file" name='image' onChange={imgSelected} accept="image/png, image/jpeg" />
                                            </label>
                                        </li>
                                        <li>
                                            <button type="button" onClick={handlePost} disabled={isNotChange()}>Post</button>
                                        </li>
                                    </ul>
                                    <div className='d-inline-flex p-2'>
                                        {post.image ? <img src={post.image} alt="" /> : null}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                : null
            }

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

            {filPosts && filPosts.length > 0 && filPosts.map((post) => {
                return (
                    <div className="central-meta item">
                        <div className="user-post">
                            <div className="friend-info">
                                <figure>
                                    <img onError={(e) => { e.target.src = "/assets/img/theme/Default-avatar.jpg" }} src={post.userInfo.avatarUrl ? post.userInfo.avatarUrl : "/assets/img/theme/Default-avatar.jpg"} alt="" style={{ width: 50, height: 50 }} />
                                </figure>
                                <div className="friend-name">
                                    <ins>
                                        <Link to={"/profile/" + post.userInfo.user.username}>
                                            {post.userInfo.user.name}
                                        </Link>
                                    </ins>
                                    <span>
                                        <Link to={"/group/" + id + "/post/" + post.id}>
                                            published: {changeTimeFormat(post.createdAt)}
                                        </Link>
                                    </span>
                                    {
                                        post.userInfo.id === profile.id ?
                                            <div className="more">
                                                <div className="more-post-optns">
                                                    <i className="ti-more-alt" />
                                                    <ul>
                                                        <li onClick={() => { post.showEdit = true; setEditPost({ ...editPost, content: post.content, image: post.image }); setFilPosts(filPosts.map((post) => ({ ...post }))) }}>
                                                            <i className="fa fa-pencil-square-o" />
                                                            Edit
                                                        </li>
                                                        <li onClick={(e) => { clickDeletePost(post.id) }}>
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
                                    {post.image ? <img src={post.image} alt="" style={{ width: 600, height: 450 }} /> : null}
                                    <div className="description">
                                        {
                                            post.showEdit ?
                                                <div className="newpst-input">
                                                    <form method="post">
                                                        <textarea
                                                            rows={3}
                                                            placeholder="write something"
                                                            defaultValue={post.content}
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

                                                                {/*////////////////// Edit POST here ////////////////// */}
                                                                <li>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            post.showEdit = false;
                                                                            setFilPosts(filPosts.map((post) => ({ ...post }))); //Reset render
                                                                            if (editPost.image !== post.image || editPost.content !== post.content)
                                                                            {
                                                                                setEditPost({ ...editPost, post_id: post.id });
                                                                                editted.current = true
                                                                            }
                                                                        }}>
                                                                        OK
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className='ml-1 add-butn more-action'
                                                                        onClick={() => {
                                                                            post.showEdit = false;
                                                                            setFilPosts(filPosts.map((post) => ({ ...post })));
                                                                        }}>
                                                                        Cancel
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
                                                    {post.content}
                                                </p>
                                        }
                                    </div>

                                    <div className="we-video-info">
                                        <ul>
                                            <li>
                                                <span className="like" data-toggle="tooltip" title="like" style={{ 'color': post.likes.some((obj) => obj.id === profile.id) ? 'red' : 'black' }}>
                                                    <i className="ti-heart" onClick={(e) => handleLike(post.id)} />
                                                    <ins>{post.likes.length || 0}</ins>
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
                                        .filter(com => com.post.id === post.id)
                                        .slice(0, post.commentToShow)
                                        .map((com) => {
                                            let filteredReply = replies.filter(rep => rep.parent_id === com.id)
                                            return (
                                                <Comment
                                                    comment={com}
                                                    replies={filteredReply}
                                                />
                                            )
                                        })}

                                    {post.showMoreLine && <li>
                                        <a href="!#" title className="showmore underline" onClick={(e) => showMore(e, post.id)}>
                                            more comments
                                        </a>
                                    </li>}
                                    <CommentForm
                                        avatarUrl={profile.avatar_url || "/assets/img/theme/Default-avatar.jpg"}
                                        handleSubmit={submitComment}
                                        id={post.id}
                                        parentId={null}
                                    />
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
            }

            {/* Map list post in here  */}
            {/* <div className="loadMore"></div> */}
        </>
    )
}

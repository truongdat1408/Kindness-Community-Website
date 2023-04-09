import * as PT from './postTypes';
import axios from 'axios';
const GET_ALL = "http://localhost:8080/api/post/all/";
const GET_ALL_JOINNED = "http://localhost:8080/api/post/all-joinned/";
const CREATE = "http://localhost:8080/api/post/create";
const LIKE = "http://localhost:8080/api/post/like";
const GET_COMMENTS = "http://localhost:8080/api/post/comment/";
const GET_ROOT_COMMENTS = "http://localhost:8080/api/post/rootcomment";
const REPLIES = "http://localhost:8080/api/post/replies";
const COMMENT = "http://localhost:8080/api/post/comment"
const DEL_COMMENT = "http://localhost:8080/api/post/delete-comment/"
const DEL_POST = "http://localhost:8080/api/post/delete-post/"
const EDIT_POST = "http://localhost:8080/api/post/edit"

export const getAllByActivityId = (activity_id) => {
    return (dispatch) => {
        dispatch({
            type: PT.POST_REQ
        });
        axios
            .get(GET_ALL + activity_id)
            .then((response) => {
                dispatch({
                    type: PT.GET_ALL,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("postAction - getAllByActivityId: " + error)
            });
    };
};

export const getAllPosts = () => {
    return (dispatch) => {
        dispatch({
            type: PT.POST_REQ
        });
        axios
            .get("http://localhost:8080/api/post/all")
            .then((response) => {
                dispatch({
                    type: PT.GET_ALL_POSTS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("getAllPosts: " + error)
            });
    };
};

export const getAllPostsJoinned = (id) => {
    return (dispatch) => {
        dispatch({
            type: PT.POST_REQ
        });
        axios
            .get(GET_ALL_JOINNED + id)
            .then((response) => {
                dispatch({
                    type: PT.GET_ALL_POSTS_JOIN,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("getAllPostsJoinned: " + error)
            });
    };
};

export const createPost = (postReq) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    try {
        const response = await axios.post(CREATE, postReq);
        dispatch({
            type: PT.CREATE_SUCCESS,
        });
        dispatch(getAllByActivityId(response.data.activity.id))
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in create Post API")
        // return Promise.reject(error.response.data);
    }
};

export const likePost = (likeReq) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    try {
        const response = await axios.post(LIKE, likeReq);
        dispatch({
            type: PT.LIKE_SUCCESS,
        });
        dispatch(getAllByActivityId(response.data.activity.id))
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in LIKE Post API")
        // return Promise.reject(error.response.data);
    }
};

export const editPostApi = (objData) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    try {
        const response = await axios.post(EDIT_POST, objData);
        dispatch({
            type: PT.EDIT_POST_SUCCESS,
            payload: response.data
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject("Error in Edit Post in Post API");
    }
};

export const createComment = (objData) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    console.log(objData)
    try {
        const response = await axios.post(COMMENT, objData);
        dispatch({
            type: PT.SUCCESS,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteComment = (id) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    try {
        const response = await axios.post(DEL_COMMENT + id);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });
    try {
        const response = await axios.post(DEL_POST + id);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getComments = (commentReq) => (dispatch) => {
    dispatch({
        type: PT.POST_REQ,
    });

    let link = GET_COMMENTS + commentReq.postId
    if (commentReq.parentId) {
        link += `/${commentReq.parentId}`
    }

    console.log("link: " + link)

    try {
        const response = axios.get(link).then((response) => response);
        dispatch({
            type: PT.LIKE_SUCCESS,
        });
        console.log("api comment ok: " + response)
        return response
    } catch (error) {
        console.log("Error in getComments API")
    }
};

export const getRootComments = () => {
    return (dispatch) => {
        dispatch({
            type: PT.POST_REQ,
        });

        axios
            .get(GET_ROOT_COMMENTS)
            .then((response) => {
                dispatch({
                    type: PT.GET_ROOT_COMMENT_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("Get root comment error: " + error)
            });
    };
};

export const getReplies = () => {
    return (dispatch) => {
        dispatch({
            type: PT.POST_REQ,
        });

        axios
            .get(REPLIES)
            .then((response) => {
                dispatch({
                    type: PT.GET_REPLIES_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("Get root comment error: " + error)
            });
    };
};

export const comment = (commentReq) => async (dispatch) => {
    try {
        const response = await axios.post(GET_COMMENTS, commentReq);
        dispatch(getAllByActivityId(response.data.post.activity.id))
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in LIKE Post API")
    }
};
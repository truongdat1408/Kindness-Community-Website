import axios from "axios";
import * as AT from "./activityTypes"

const CREATE_ACTIVITY = "http://localhost:8080/api/activity/create";
const UPDATE_ACTIVITY = "http://localhost:8080/api/activity/edit-activity";
const JOIN_ACTIVITY = "http://localhost:8080/api/activity/join";
const JOIN_WAIT_ACTIVITY = "http://localhost:8080/api/activity/join-wait";
// const GET_ALL = "http://localhost:8080/api/activity/all";
const GET_ONE = "http://localhost:8080/api/activity/";
const GET_USER_INFO = "http://localhost:8080/user-info?id=";
const GET_MEMBERS = "http://localhost:8080/api/activity/members/";
const GET_WAIT_MEMBERS = "http://localhost:8080/api/activity/wait-members/";
const UNJOIN_ACTIVITY = "http://localhost:8080/api/activity/unjoin";
const UPDATE_COVER = "http://localhost:8080/api/activity/cover"
const ACCEPT_JOIN = "http://localhost:8080/api/activity/accept-join"

export const createActivity = (activityObject) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(CREATE_ACTIVITY, activityObject);
        dispatch({
            type: AT.ACTIVITY_CREATE_SUCCESS,
        });
        //dispatch(fetchUsers())
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: error.response.data.message,
        });
        return Promise.reject(error.response.data);
    }
};

export const updateActivity = (activityObject) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(UPDATE_ACTIVITY, activityObject);
        dispatch({
            type: AT.ACTIVITY_CREATE_SUCCESS,
        });
        dispatch(getActivity(activityObject.id))
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: error.response.data.message,
        });
        return Promise.reject(error.response.data);
    }
};

export const updateCover = (coverObj) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(UPDATE_COVER, coverObj);
        dispatch({
            type: AT.GET_ONE,
            payload: response.data
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};

export const fetchActivites = () => {
    return (dispatch) => {
        dispatch({
            type: AT.ACTIVITY_REQUEST,
        });
        axios
            .get("http://localhost:8080/api/activity/all")
            .then((response) => {
                dispatch({
                    type: AT.GET_ALL_ACTIVITIES,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: AT.ACTIVITY_ERROR,
                    payload: "Error get activities!!",
                });
            });
    };
};

export const getAdmin = (id) => {
    return (dispatch) => {
        dispatch({
            type: AT.ACTIVITY_REQUEST,
        });
        axios
            .get(GET_USER_INFO + id)
            .then((response) => {
                dispatch({
                    type: AT.GET_USER_INFO_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log("activityAction - getAdmin: " + error)
            });
    };
};

export const getMembersByActivityId = (id) => {
    
    return (dispatch) => {
        dispatch({
            type: AT.ACTIVITY_REQUEST,
        });
        axios
            .get(GET_MEMBERS + id)
            .then((response) => {
                dispatch({
                    type: AT.GET_MEMBERS_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log("ERROR get Members by activity id: " + error)
            });
    };
};

export const getWaitMembersByActivityId = (id) => {
    
    return (dispatch) => {
        dispatch({
            type: AT.ACTIVITY_REQUEST,
        });
        axios
            .get(GET_WAIT_MEMBERS + id)
            .then((response) => {
                dispatch({
                    type: AT.GET_WAIT_MEMBERS_SUCCESS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log("ERROR get Members by activity id: " + error)
            });
    };
};

export const joinActivity = (joinReq) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(JOIN_ACTIVITY, joinReq);
        dispatch({
            type: AT.GET_MEMBERS_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: "Error: join Activity API",
        });
        return Promise.reject(error);
    }
};

export const joinWaitActivity = (joinReq) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(JOIN_WAIT_ACTIVITY, joinReq);
        dispatch({
            type: AT.GET_WAIT_MEMBERS_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: "Error: join Activity API",
        });
        return Promise.reject(error);
    }
}

export const acceptJoinActivity = (joinReq) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(ACCEPT_JOIN, joinReq);
        dispatch({
            type: AT.GET_MEMBERS_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: "Error: accept join Activity API",
        });
        return Promise.reject(error);
    }
};

export const unjoinActivity = (unjoinReq) => async (dispatch) => {
    dispatch({
        type: AT.ACTIVITY_REQUEST,
    });
    try {
        const response = await axios.post(UNJOIN_ACTIVITY, unjoinReq);
        dispatch({
            type: AT.GET_MEMBERS_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch({
            type: AT.ACTIVITY_ERROR,
            payload: "Error: unjoin Activity API",
        });
        return Promise.reject(error);
    }
};

export const getActivity = (id) => {
    
    return (dispatch) => {
        dispatch({
            type: AT.ACTIVITY_REQUEST,
        });
        axios
            .get(GET_ONE + id)
            .then((response) => {
                dispatch({
                    type: AT.GET_ONE,
                    payload: response.data,
                });
                dispatch(getAdmin(response.data.adminId))
                dispatch(getMembersByActivityId(id))
                dispatch(getWaitMembersByActivityId(id))
            })
            .catch((error) => {
                dispatch({
                    type: AT.ACTIVITY_ERROR,
                    payload: "Error get activity by id = " + id,
                });
            });
    };
};
import * as UT from "./userTypes";
import axios from "axios";

const REGISTER_URL = "http://localhost:8080/api/auth/signup";
const GET_ALL = "http://localhost:8080/users";
const CREATE_USER = "http://localhost:8080/users/create";
const GET_PROFILE = "http://localhost:8080/user-info?id="
const GET_ONE_BY_USERNAME = "http://localhost:8080/get-user-info-by-username/"

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(userRequest());
        axios
            .get(GET_ALL)
            .then((response) => {
                dispatch(userSuccess(response.data));
            })
            .catch((error) => {
                dispatch(userFailure(error.message));
            });
    };
};

export const getOneUser = (id) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios
            .get(GET_PROFILE + id)
            .then((response) => {
                dispatch({
                    type: UT.GET_ONE_USER_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("authAction - getProfile: " + error)
            });
    };
};

export const getOneUserByUsername = (username) => {
    return (dispatch) => {
        dispatch(userRequest());
        axios
            .get(GET_ONE_BY_USERNAME + username)
            .then((response) => {
                dispatch({
                    type: UT.GET_ONE_USER_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("authAction - getProfile: " + error)
            });
    };
};

export const registerUser = (userObject) => async (dispatch) => {
    dispatch(userRequest());
    try {
        const response = await axios.post(REGISTER_URL, userObject);
        dispatch(userSavedSuccess(response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(userFailure(error.message));
        return Promise.reject(error);
    }
};


export const createUser = (userObject) => async (dispatch) => {
    dispatch(userRequest());
    try {
        const response = await axios.post(CREATE_USER, userObject);
        dispatch(userSavedSuccess(response.data.message));
        //dispatch(fetchUsers()) 
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(userFailure(error.response.data.message));
        return Promise.reject(error.response.data);
    }
};

const userRequest = () => {
    return {
        type: UT.USER_REQUEST,
    };
};

const userSavedSuccess = (message) => {
    return {
        type: UT.USER_SAVED_SUCCESS,
        payload: message,
    };
};

const userSuccess = (users) => {
    return {
        type: UT.USER_SUCCESS,
        payload: users,
    };
};

const userFailure = (error) => {
    return {
        type: UT.USER_FAILURE,
        payload: error,
    };
};
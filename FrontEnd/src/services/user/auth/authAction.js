import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth/signin"
const GET_PROFILE = "http://localhost:8080/user-info?id="
const UPDATE_PROFILE = "http://localhost:8080/user-info"
const REGISTER = "http://localhost:8080/api/auth/register"
const PASSWORD = "http://localhost:8080/api/auth/change-password"

export const authenticateUser = (username, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(AUTH_URL, {
            username: username,
            password: password,
        });
        localStorage.setItem("jwtToken", `Bearer ${response.data.accessToken}`);
        dispatch(success({ user: response.data, isLoggedIn: true }));
        dispatch(getProfile(response.data.id))
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error);
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.clear();
        dispatch(logoutSuccess());
    };
};

export const setBreadCrum = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.clear();
        dispatch(logoutSuccess());
    };
};

export const getProfile = (id) => {
    return (dispatch) => {
        dispatch(loginRequest());
        axios
            .get(GET_PROFILE + id)
            .then((response) => {
                dispatch(getProfileSuccess(response.data));
            })
            .catch((error) => {
                console.log("authAction - getProfile: " + error)
            });
    };
};

export const updateProfile = (profileObject) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(UPDATE_PROFILE, profileObject);
        dispatch(updateProfileSuccess(response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failRequest());
        console.log("authAction - updateProfile" + error)
        return Promise.reject(error);
    }
};

export const changePassword = (passwordRequest) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(PASSWORD, passwordRequest);
        // dispatch(updateProfileSuccess(response.data));
        console.log(response.data)
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failRequest());
        console.log("authAction - changePassword" + error)
        return Promise.reject(error);
    }
};

export const registerAuthUser = (registerRequest) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(REGISTER, registerRequest);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("authAction - registerUser" + error.response.data.message)
        return Promise.reject(error.response.data);
    }
};

export const updateImg = (id, urlImg, isCover) => async (dispatch) => {
    let linkApi = isCover ? UPDATE_PROFILE + `/cover?id=${id}&cover=${urlImg}` : UPDATE_PROFILE + `/avatar?id=${id}&avatar=${urlImg}`;

    dispatch(loginRequest());
    try {
        const response = await axios.post(linkApi);
        dispatch(updateProfileSuccess(response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failRequest());
        console.log("updateImg - updateProfile" + error)
        return Promise.reject(error);
    }
};

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    };
};

const logoutRequest = () => {
    return {
        type: AT.LOGOUT_REQUEST,
    };
};

const success = (response) => {
    return {
        type: AT.SUCCESS,
        payload: response,
    };
};

const failRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    };
}

const logoutSuccess = () => {
    return {
        type: AT.LOGOUT_SUCCESS,
    };
}

const getProfileSuccess = (resp) => {
    return {
        type: AT.GET_PROFILE,
        payload: resp
    }
}

const updateProfileSuccess = (resp) => {
    return {
        type: AT.UPDATE_PROFILE_SUCCESS,
        payload: resp
    }
}

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false,
    };
};
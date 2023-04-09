import { LOGIN_REQUEST, LOGOUT_REQUEST, FAILURE, SUCCESS, GET_PROFILE, LOGOUT_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_IMG } from './authTypes';

const initialState = {
    isLoggedIn: "",
    user: {},
    profile: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case UPDATE_IMG:
            return {
                ...state,
            };
        case SUCCESS:
        case FAILURE:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case GET_PROFILE:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }
        case LOGOUT_SUCCESS:
            return initialState

        default:
            return state;
    }
};

export default reducer;
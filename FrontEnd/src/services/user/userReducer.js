import * as UT from "./userTypes";

const initialState = {
    users: [],
    user: {},
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UT.USER_REQUEST:
            return {
                ...state,
            }
        case UT.USER_SUCCESS:
            return {
                users: action.payload,
                error: "",
            }
        case UT.USER_SAVED_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: "",
            }
        case UT.USER_FAILURE:
            return {
                ...state,
                error: action.payload,
            }
        case UT.GET_ONE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
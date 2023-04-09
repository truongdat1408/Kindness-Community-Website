import * as AT from "./activityTypes";

const initialState = {
    activities: [],
    acts: [],
    activity: {},
    admin: {},
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.ACTIVITY_REQUEST:
            return {
                ...state,
                error: ""
            };
        case AT.ACTIVITY_CREATE_SUCCESS:
            return {
                ...state,
                error: "",
            };
        case AT.ACTIVITY_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case AT.GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
                acts: action.payload,
                error: ""
            }

        case AT.GET_ONE:
            return {
                ...state,
                activity: action.payload,
                error: ""
            }
        case AT.GET_WAIT_MEMBERS_SUCCESS:
            return {
                ...state,
                activity: {
                    ...state.activity,
                    waitMembers: action.payload
                }
            }
        case AT.GET_MEMBERS_SUCCESS:
            return {
                ...state,
                activity: {
                    ...state.activity,
                    members: action.payload
                },
            }
        case AT.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                admin: action.payload,
                error: ""
            }
        default:
            return {
                ...state
            };
    }
};

export default reducer;
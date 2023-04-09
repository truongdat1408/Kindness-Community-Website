import userReducer from "./user/userReducer.js";
import authReducer from "./user/auth/authReducer.js"
import activityReducer from "./activity/activityReducer.js"
import postReducer from "./post/postReducer.js"
import qaReducer from "./qa/qaReducer.js"
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    activity: activityReducer,
    post: postReducer,
    qa: qaReducer
});

export default rootReducer;
import * as PT from './postTypes'

const initialState = {
    posts: [],
    post: {},
    rootComments: [],
    replies: [],
    listPosts: [],
    filListPosts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PT.POST_REQ:
        case PT.CREATE_SUCCESS:
        case PT.LIKE_SUCCESS:
        case PT.SUCCESS:
            return {
                ...state,
            };
        case PT.GET_ALL_POSTS:
            return {
                ...state,
                listPosts: action.payload
            }
        case PT.GET_ROOT_COMMENT_SUCCESS:
            return {
                ...state,
                rootComments: action.payload
            };
        case PT.GET_REPLIES_SUCCESS:
            return {
                ...state,
                replies: action.payload
            };
        case PT.GET_ALL:
        case PT.EDIT_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload
            };
        case PT.GET_ALL_POSTS_JOIN:
            return {
                ...state,
                filListPosts: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
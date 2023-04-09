import * as QA from './qaTypes'

const initialState = {
    questions: [],
    answers: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case QA.QA_REQ:
            return {
                ...state,
            };
        case QA.GET_ALL_Q:
            return {
                ...state,
                questions: action.payload
            }
        case QA.GET_ALL_A:
            return {
                ...state,
                answers: action.payload
            }
        default:
            return state;
    }
};

export default reducer;
import * as QA from './qaTypes';
import axios from 'axios';
const GET_ALL_Q = "http://localhost:8080/api/qa/all-question/";
const GET_ALL_A = "http://localhost:8080/api/qa/all-answer/";
const CREATE_QUESTION = "http://localhost:8080/api/qa/create-question";
const CREATE_ANSWER = "http://localhost:8080/api/qa/create-answer";
const DELETE_ANSWER = "http://localhost:8080/api/qa/delete-answer/";
const EDIT_ANSWER = "http://localhost:8080/api/qa/edit-answer";
const DELETE_QUESTION = "http://localhost:8080/api/qa/delete-question/";
const EDIT_QUESTION = "http://localhost:8080/api/qa/edit-question";

export const getAllQuestionsByActivityId = (activity_id) => {
    return (dispatch) => {
        dispatch({
            type: QA.QA_REQ
        });
        axios
            .get(GET_ALL_Q + activity_id)
            .then((response) => {
                dispatch({
                    type: QA.GET_ALL_Q,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("getAllQuestionsByActivityId: " + error)
            });
    };
};

export const getAllAnswersByActivityId = (activity_id) => {
    return (dispatch) => {
        dispatch({
            type: QA.QA_REQ
        });
        axios
            .get(GET_ALL_A + activity_id)
            .then((response) => {
                dispatch({
                    type: QA.GET_ALL_A,
                    payload: response.data
                });
            })
            .catch((error) => {
                console.log("getAllAnswersByActivityId: " + error)
            });
    };
};

export const createQuestion = (questionReq) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(CREATE_QUESTION, questionReq);
        dispatch({
            type: QA.QA_REQ,
        });
        dispatch(getAllQuestionsByActivityId(questionReq.activity_id))
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in createQuestion")
        // return Promise.reject(error.response.data);
    }
};

export const createAnswer = (answerReq) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(CREATE_ANSWER, answerReq);
        dispatch({
            type: QA.QA_REQ,
        });
        dispatch(getAllAnswersByActivityId(response.data.question.activity.id))
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in createQuestion")
        // return Promise.reject(error.response.data);
    }
};

export const deleteAnswer = (answer_id) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(DELETE_ANSWER + answer_id);
        dispatch({
            type: QA.QA_REQ,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in deleteQuestion")
        // return Promise.reject(error.response.data);
    }
};

export const editAnswerApi = (answerReq) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(EDIT_ANSWER, answerReq);
        dispatch({
            type: QA.GET_ALL_A,
            payload: response.data
        });
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in editAnswerApi")
        // return Promise.reject(error.response.data);
    }
};

export const deleteQuestion = (question_id) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(DELETE_QUESTION + question_id);
        dispatch({
            type: QA.QA_REQ,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in deleteQuestion")
        // return Promise.reject(error.response.data);
    }
};

export const editQuestionApi = (questionReq) => async (dispatch) => {
    dispatch({
        type: QA.QA_REQ,
    });
    try {
        const response = await axios.post(EDIT_QUESTION, questionReq);
        dispatch({
            type: QA.GET_ALL_Q,
            payload: response.data
        });
        return Promise.resolve(response.data);
    } catch (error) {
        console.log("Error in editQuestionApi")
        // return Promise.reject(error.response.data);
    }
};
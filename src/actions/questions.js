import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTION_INIT = 'FETCH_QUESTION_INIT';
export const fetchQuestionInit = loading => ({
  type: FETCH_QUESTION_INIT,
  loading
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (image, answer) => ({
    type: FETCH_QUESTION_SUCCESS,
    image,
    answer,
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION__ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error,
});

export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const setCorrectAnswer = (inputAnswer, currentAnswer, numCorrect) => ({
  type: SET_CORRECT_ANSWER,
  numCorrect,
  inputAnswer,
  currentAnswer
})


export const fetchQuestion = (userId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    dispatch(fetchQuestionInit());
    return fetch(`${API_BASE_URL}/users/`+ userId, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => {
          dispatch(fetchQuestionSuccess(data.image, data.answer));
        })
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};

export const sendAnswer = (values) => (dispatch,getState) => {
  const id = getState().auth.userId ;
  const correct = values.answer === getState().questionData.answer ? true : false;
  dispatch(setCorrectAnswer(correct, getState().questionData.answer, getState().questionData.numCorrect));
  dispatch(fetchQuestionInit());
  return fetch(`${API_BASE_URL}/users/` + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({correct: correct})
  })
  .then( res => {
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(next => {
    dispatch(fetchQuestionSuccess(next.image, next.answer));
  })
  .catch(err => {
    dispatch(fetchQuestionError(err))
  }) 
}
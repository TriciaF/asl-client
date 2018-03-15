import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTION_INIT = 'FETCH_QUESTION_INIT';
export const fetchQuestionInit = loading => ({
  type: FETCH_QUESTION_INIT,
  loading
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (image, answer, nextQuestion) => ({
    type: FETCH_QUESTION_SUCCESS,
    image,
    answer,
    nextQuestion,
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION__ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error,
});

export const SET_NEXT_QUESTION = 'SET_NEXT_QUESTION';
export const setNextQuestion = () => ({
  type: SET_NEXT_QUESTION,
  nextQuestion: true, 
});

export const fetchQuestion = (userId) => (dispatch, getState) => {
  console.log('Enter fetchQuestion, userID = ', userId)
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
          console.log('data back from fetch  ', data);
          dispatch(fetchQuestionSuccess(data));
        })
        .catch(err => {
          console.log("fetch error  ", err)
            dispatch(fetchQuestionError(err));
        });
};

export const sendAnswer = (values) => (dispatch,getState) => {
  console.log('Enter sendAnswer')
  const id = getState().auth.userId ;
  const correct = values.answer === getState().questionData.answer ? true : false;
  dispatch(fetchQuestionInit());
  return fetch(`${API_BASE_URL}/users/` + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({correct: true})
  })
  .then( res => {
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.status;
  })
  .then(({nextQuestion}) => dispatch(setNextQuestion()))
  .catch(err => {
    dispatch(fetchQuestionError(err))
  }) 
}
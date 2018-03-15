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
console.log(fetchQuestionSuccess("some image", "some answer", "another question"));

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION__ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error,
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
          dispatch(fetchQuestionSuccess(data.image, data.answer));
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
    body: JSON.stringify({correct: correct})
  })
  .then( res => {
    console.log("this is res", res)
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(next => {
    console.log('next Question  ', next);
    dispatch(fetchQuestionSuccess(next.image, next.answer));
  })
  .catch(err => {
    console.log('this is error ', err)
    dispatch(fetchQuestionError(err))
  }) 
}
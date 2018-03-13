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
    answer
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION__ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error,
});

export const fetchQuestion = () => (dispatch, getState) => {
  console.log('Enter fetchQuestion')
    const authToken = getState().auth.authToken;
    dispatch(fetchQuestionInit());
    return fetch(`${API_BASE_URL}/users/5aa81923f7e247a6f58faf47`, {
        method: 'GET',
        headers: {
            'content-type': 'appliction/json',
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
            dispatch(fetchQuestionError(err));
        });
};

export const sendAnswer = (answer) => (dispatch,getState) => {
  console.log('Enter sendAnswer', answer);
  // const authToken = getState().auth.authToken;
  // dispatch(fetchQuestionInit());
  // return fetch(`${API_BASE_URL}/user`, {
  //   method: 'PUT',
  //   headers: {
  //     'content-type': 'application/json',
  //     Authorization: `Bearer ${authToken}`
  //   },
  //   body: JSON.stringify(answer)
  // })
  // .then( res => {
  //   if(!res.ok) {
  //     return Promise.reject(res.statusText)
  //   }
  // })
  // .then(({question }) => dispatch(fetchQuestion()))
  // .then( res => {
  //   if(!res.ok) {
  //     return Promise.reject(res.statusText)
  //   }
  // })
  //   .then(data => {
  //     console.log('another question back from fetch ', data);
  //     dispatch(fetchQuestionSuccess(data))
  //   })
  //   .catch(err => {
  //   dispatch(fetchQuestionError(err));
  // })
}
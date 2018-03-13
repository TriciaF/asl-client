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
    return fetch(`${API_BASE_URL}/question`, {
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
            dispatch(fetchQuestionError(err));
        });
};

export const sendAnswer = (answer) => (dispatch) => {
  console.log('Enter sendAnswer')
}
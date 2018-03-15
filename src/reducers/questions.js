import {
    FETCH_QUESTION_INIT,
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR,
    SET_CORRECT_ANSWER
} from '../actions/questions';

const initialState = {
    image: null,
    answer: null,
    error: null,
    loading: false,
    inputAnswer: false,
    feedback: false,
    currentAnswer: null,
};

export default function reducer(state = initialState, action) {
 if(action.type === FETCH_QUESTION_INIT) {
   return Object.assign({}, state, {
     loading: true,
   });
 } else if (action.type === FETCH_QUESTION_SUCCESS) {
   console.log('Enter fetchQuestionSuccess ', action)
   return Object.assign({}, state, {
     image: action.image,
     answer: action.answer,
     error: false,
     loading: false,
   });
 } else if (action.type === FETCH_QUESTION_ERROR) {
   console.log('Enter fetchQuestionError ', action)
     return Object.assign({}, state, {
     error: action.error,
     loading: false
   });
 } else if (action.type === SET_CORRECT_ANSWER) {
   console.log('Enter setCorrectAnswer ', action);
   return Object.assign( {}, state, {
     inputAnswer: action.inputAnswer,
     currentAnswer: action.currentAnswer,
     feedback: true
   });
 }
    return state;
}

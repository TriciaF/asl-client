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
    numCorrect: 0,
};

export default function reducer(state = initialState, action) {
 if(action.type === FETCH_QUESTION_INIT) {
   return Object.assign({}, state, {
     loading: true,
   });
 } else if (action.type === FETCH_QUESTION_SUCCESS) {
   return Object.assign({}, state, {
     image: action.image,
     answer: action.answer,
     error: false,
     loading: false,
   });
 } else if (action.type === FETCH_QUESTION_ERROR) {
     return Object.assign({}, state, {
     error: action.error,
     loading: false
   });
 } else if (action.type === SET_CORRECT_ANSWER) {
  let num = 0;
  if(action.inputAnswer)
    num = 1
   return Object.assign( {}, state, {
     numCorrect: action.numCorrect + num,
     inputAnswer: action.inputAnswer,
     currentAnswer: action.currentAnswer,
     feedback: true
   })
 }
    return state;
}

import {
    FETCH_QUESTION_INIT,
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR
} from '../actions/questions';

const initialState = {
    image: null,
    answer: null,
    error: null,
    quesitonId: null,
    loading: false
};

export default function reducer(state = initialState, action) {
  console.log("Enter fetchQuestionInit")
 if(action.type === FETCH_QUESTION_INIT) {
   return Object.assign({}, state, {
     loading: true
   });
 } else if (action.type === FETCH_QUESTION_SUCCESS) {
   console.log('Enter fetchQuestionSuccess ', action)
   return Object.assign({}, state, {
     image: action.image.image,
     answer: action.image.answer,
     questionId: action.image._id, 
     error: false,
     loading: false 
   });
 } else if (action.type === FETCH_QUESTION_ERROR) {
   console.log('Enter fetchQuestionError ', action)
     return Object.assign({}, state, {
     error: action.error,
     loading: false
   });
 }
    return state;
}

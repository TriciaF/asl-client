import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import QuestionInput from './question-input';
import {required, nonEmpty} from '../validators';
import {sendAnswer} from '../actions/questions';

export class QuestionForm extends React.Component {

    onSubmit(values) {
      return this.props.dispatch(sendAnswer(values));
    }


    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        let feedback;
        if(this.props.feedback) {
          if(this.props.inputAnswer){
            feedback = (
                <h3 className="tag-line">Correct!</h3>
            );
          }
          if(!this.props.inputAnswer) {
            feedback =  (
                <h3 className="tag-line">Incorrect, the correct answer is: {this.props.currentAnswer}</h3>
            );
          }
      }

        return (
          <div className='question-form-home'>
            <div className='image'>
               <img src={this.props.image} alt="question"/>
               <p>{feedback}</p>
            </div>
            <form
                className="question-form"
                onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
                {error}
                <Field
                    component={QuestionInput}
                    type="text"
                    name="answer"
                    id="answer"
                    placeholder="enter answer here"
                    validate={[required, nonEmpty]}
                />
                <button className="answer-button" disabled={this.props.pristine || this.props.submitting}>
                   Submit 
                </button>
            </form>
          </div>
        );
    }
}

export default reduxForm({
    form: 'QuestionForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('answer'))
})(QuestionForm);
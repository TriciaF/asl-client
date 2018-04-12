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
        let correct;

        if(this.props.feedback) {
          correct = (
            <div>
              <h3 className='tag-line'>You have answered {this.props.numCorrect} correctly</h3>
            </div>
          );
          if(this.props.inputAnswer){
            feedback = (
              <div>
                <h3 className="tag-line">Correct!</h3>
              </div>
            );
          }
          if(!this.props.inputAnswer) {
            feedback =  (
              <div>
                <h3 className="tag-line">Incorrect, the correct answer is: {this.props.currentAnswer}</h3>
              </div>
            );
          }
       }

        return (
          <div className='question-form-home'>
            {feedback}
            <div className='image'>
               <img src={this.props.image} alt="question"/>
               {correct}
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
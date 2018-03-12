import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import QuestionInput from './question-input';
import {required, nonEmpty} from '../validators';

export class QuestionForm extends React.Component {

    onSubmit(event) {
      event.preventDefault();
      const answer = event.target.answer.value;
      console.log(answer);
      // return this.props.dispatch(login(username, password));
    }

    render() {
      console.log('Enter LoginForm component');
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form
                className="question-form"
                onSubmit={e => this.onSubmit(e)}>
                {error}
                <img src='https://i.imgur.com/QVByr5l.png' alt="question"/>
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
        );
    }
}

export default reduxForm({
    form: 'QuestionForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('answer'))
})(QuestionForm);
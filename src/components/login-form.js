import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
      console.log('Enter onSubmit values = ',values);
        return this.props.dispatch(login(values.username, values.password));
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
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
                {error}
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    validate={[required, nonEmpty]}
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    validate={[required, nonEmpty]}
                />
                <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                <p>Don't have an account?<a href='.'>Register here</a></p>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);

import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators'; 
  
  export class DemoLoginForm extends React.Component {
      
    onSubmit(values) {
          return this.props.dispatch(login('demo', 'demodemodemo'));
      }
  
      render() {
          let demoUsername = 'demo';
          let demoPassword = 'demodemodemo';
          let error;
          if (this.props.error) {
              error = (
                  <div className="form-error" aria-live="polite">
                      {this.props.error}
                  </div>
              );
          }
          
          return (
            
            <div className='home'>
             <h2 className='tag-line'>Log in to get started</h2>
             
              <form
                  className="login-form"
                  onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                  {error}
                  <h3 className='demo'>Demo Username: demo</h3>
                  <h3 className='demo'>Demo Password: demodemodemo</h3>
                  <Field
                      component={Input}
                      type="text"
                      name="username"
                      id="username"
                      placeholder={demoUsername}
                      validate={[required, nonEmpty]}
                  />
                  <Field
                      component={Input}
                      type="password"
                      name="password"
                      id="password"
                      placeholder={demoPassword}
                      validate={[required, nonEmpty]}
                  />
                  <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                      Log in
                  </button>
                  <p>Don't have an account?<a href='./register'>Register here</a></p>
             </form>
           </div> 
         );
      }
  }
  
  export default reduxForm({
      form: 'login',
      onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
  })(DemoLoginForm);
  
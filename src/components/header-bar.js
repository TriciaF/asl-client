import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import LoginForm from './login-form';
import {login} from '../actions/auth';

export class HeaderBar extends React.Component {

    demo() {
      return this.props.dispatch(login('demo', 'demodemodemo'));
    }
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    logIn() {
        return <LoginForm /> 
    }
    register() {
      return <div>register</div>
    }

  render() {
      // Only render the log out button if we are logged in
      let logOutButton;
      let logInButton;
      let register;
      let demoButton;

      if (this.props.demo) {
          demoButton = (
              <div onClick={() => this.demo()}>
                <a className="nav-words" href='/demo' >
                    Demo
                </a>
              </div>
          );
      }
      if (this.props.loggedIn) {
          logOutButton = (
              <div onClick={() => this.logOut()}>
                <a className="nav-words" href='/'>
                  Log out
                </a>
              </div>
          );
      }
      if (!this.props.loggedIn) {
          logInButton = (
               <div onClick={() => this.logIn()}>
                  <a className="nav-words" href='/login'>
                    Log in
                  </a>
                </div>
            );
        }
        if (!this.props.loggedIn) {
            register = (
                <div onClick={() => this.register()}>
                    <a className="nav-words" href='/register'>
                    Register
                    </a>
                </div>
            );
        }
        return (
            <div className="header-bar">
              <div>
                <a className="nav-words-nidcd" href='https://www.nidcd.nih.gov/health/american-sign-language' target="_blank" rel="noopener noreferrer">
                  NIDCD Website
                </a>
              </div>
              <div>
                <a className="nav-words-faq" href='http://www.signgenius.com/sign-language/sign-language-faq-introduction.shtml' target="_blank" rel="noopener noreferrer">
                  ASL FAQs
                </a>
              </div>
                  
                  {register}
                  {logInButton}
                  {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    demo: state.auth.demo = true,
    loggedIn: state.auth.currentUser,
    currentUser:  state.auth.currentUser,

});

export default connect(mapStateToProps)(HeaderBar);

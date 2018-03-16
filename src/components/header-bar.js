import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import LoginForm from './login-form';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    logIn() {
        // this.props.dispatch(showLoginForm());
        return <LoginForm /> 
  }

  register(){
      // this.props.dispatch(showRegistrationForm())
      return <div>register</div>
  }

  render() {
      // Only render the log out button if we are logged in
      let logOutButton;
      let logInButton;
      let register;
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
            )
        }
        if (!this.props.loggedIn) {
            register = (
                <div onClick={() => this.register()}>
                  <a className="nav-words" href='/register'>
                    Register
                  </a>
               </div>
            )
        }
        return (
            <div className="header-bar">
              <div>
                <a className="nav-words-nidcd" href='https://www.nidcd.nih.gov/health/american-sign-language'>
                  NIDCD Website
                </a>
              </div>
              <div>
                <a className="nav-words-faq" href='http://www.signgenius.com/sign-language/sign-language-faq-introduction.shtml'>
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
    loggedIn: state.auth.currentUser,
    currentUser:  state.auth.currentUser,

});

export default connect(mapStateToProps)(HeaderBar);

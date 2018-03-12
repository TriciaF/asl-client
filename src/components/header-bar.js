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
                <a href='/'>
                  Log out
                </a>
              </div>
          );
      }
      if (!this.props.loggedIn) {
          logInButton = (
               <div onClick={() => this.logIn()}>
                  <a href='/login'>
                    Log in
                  </a>
                </div>
            )
        }
        if (!this.props.loggedIn) {
            register = (
                <div onClick={() => this.register()}>
                  <a href='/register'>
                    Register
                  </a>
               </div>
            )
        }
        return (
            <div className="header-bar">
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

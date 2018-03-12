import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';
import { HeaderBar } from './header-bar';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h2>Learning the American Sign Language Alphabet</h2>
            {/* <LoginForm /> */}
            {/* <Link to="/register">Register</Link> */}
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(LandingPage);

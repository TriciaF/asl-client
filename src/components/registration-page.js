import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="home">
            <h2>Register for American Sign Language Learning App</h2>
            <RegistrationForm />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser
});

export default connect(mapStateToProps)(RegistrationPage);

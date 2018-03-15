import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (this.props.loggedIn) {
      console.log("enter the Landing page")
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
           <h2>Learning the American Sign Language Alphabet</h2>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser
});

export default connect(mapStateToProps)(LandingPage);

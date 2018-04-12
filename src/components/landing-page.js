import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
      console.log("enter the Landing page")
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
           <h1 className='tag-line-title'>Learning American Sign Language Alphabet</h1>
                <h3 className='tag-line-about'>Sign language is based on the idea that sight is the most useful tool a deaf person has to communicate and receive information. Thus, ASL uses hand shape, position, and movement; body movements; gestures; facial expressions; and other visual cues to form its words.</h3>
                <h3 className='tag-line-about'>This application uses the spaced repetition learning methology to teach the first sign language application...</h3>
                <h1 className='tag-line-title'>The ASL Alphabet</h1>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser
});

export default connect(mapStateToProps)(LandingPage);

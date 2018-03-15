import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Dashboard from './dashboard';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import LoginForm from './login-form';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
            this.props.history.push('/dashboard')
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/dashboard" component={Dashboard} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken,
    loggedIn: state.auth.currentUser
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));

import React from 'react';
import {connect} from 'react-redux';
import QuestionForm from './question-form';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
    componentDidMount() {
      console.log("enter componentDidMount Dashboard,  userId = ", this.props.userId)
        return this.props.dispatch(fetchQuestion(this.props.userId));
    }


    render() {
      
    // if(!this.props.loading){
    //  return (this.props.dispatch(fetchQuestion(this.props.userId)));
    // }

      // if(!this.props.error)
        return (
            <div className="dashboard">
              <QuestionForm image={this.props.image} onSubmit={this.props.answer} error={this.props.error} />
            </div>
        );
        // return (
        //     <span>{this.props.error}</span>
        // );
    }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  image: state.questionData.image,
  answer: state.questionData.answer,
  error: state.questionData.error,
  loading: state.questionData.loading
});

export default connect(mapStateToProps)(Dashboard);

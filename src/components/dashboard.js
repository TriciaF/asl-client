import React from 'react';
import {connect} from 'react-redux';
import QuestionForm from './question-form';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
    // componentWillMount() {
    //   console.log("enter componentDidMount Dashboard,  userId = ", this.props.userId)
    //     return this.props.dispatch(fetchQuestion(this.props.userId));
    // }


    render() {
      console.log('enter dashboard nextQuestion = ', this.props.nextQuestion);
      console.log('userId = ', this.props.userId)
      
    if(this.props.nextQuestion){
      this.props.dispatch(fetchQuestion(this.props.userId));
    }
      return (
       <div className="dashboard">
          <QuestionForm image={this.props.image} onSubmit={this.props.answer} error={this.props.error} />
       </div>
      );
    }
}

const mapStateToProps = state => ({
  nextQuestion: state.questionData.nextQuestion,
  userId: state.auth.userId,
  image: state.questionData.image,
  answer: state.questionData.answer,
  error: state.questionData.error,
});

export default connect(mapStateToProps)(Dashboard);

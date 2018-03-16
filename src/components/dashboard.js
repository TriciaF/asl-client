import React from 'react';
import {connect} from 'react-redux';
import QuestionForm from './question-form';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
    componentWillMount() {
      console.log('dashboard - component will mount ', this.props.nextQuestion)
      return this.props.dispatch(fetchQuestion(this.props.userId));
    }

    render() {
      console.log("this is feedback ", this.props.feedback);
      console.log('this is inputAnswer ', this.props.inputAnswer)
      console.log("the current answer is ", this.props.currentAnswer)
       
      return (
       <div className="dashboard">
          <QuestionForm image={this.props.image} i
                        onSubmit={this.props.answer} 
                        error={this.props.error} 
                        feedback={this.props.feedback}
                        inputAnswer={this.props.inputAnswer}
                        currentAnswer={this.props.currentAnswer}/>
       </div>
      );
    }
}

const mapStateToProps = state => ({
  feedback: state.questionData.feedback,
  userId: state.auth.userId,
  image: state.questionData.image,
  answer: state.questionData.answer,
  error: state.questionData.error,
  inputAnswer: state.questionData.inputAnswer,
  currentAnswer: state.questionData.currentAnswer
});

export default connect(mapStateToProps)(Dashboard);

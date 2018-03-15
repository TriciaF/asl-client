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
       let feedback;
       if(this.props.feedback) {
        if(this.props.inputAnswer){
          console.log("correctAnswer ", this.props.currentAnswer)
          feedback = (
            <div>
              <p>Correct!</p>
            </div>
          );
        }
        if(!this.props.inputAnswer) {
          console.log('not the correct answer ', this.props.answer)
          feedback =  (
            <div>
              <p>Incorrect, the correct answer is {this.props.currentAnswer}</p>
            </div>
          );
        }
    }
      return (
       <div className="dashboard">
          <QuestionForm image={this.props.image} onSubmit={this.props.answer} error={this.props.error} />
          {feedback}
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

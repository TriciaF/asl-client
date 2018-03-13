import React from 'react';
import {connect} from 'react-redux';
import QuestionForm from './question-form';
import {fetchQuestion} from '../actions/questions';

export class Dashboard extends React.Component {
    componentDidMount() {
      console.log("enter componentDidMount Dashboard")
        this.props.dispatch(fetchQuestion());
    }


    render() {
      
    // if(!this.props.loading){
    //  return (this.props.dispatch(fetchQuestion()));
    // }
      if(!this.props.error)
        return (
            <div className="dashboard">
              <QuestionForm image={this.props.image} onSubmit={this.props.answer} error={this.props.error} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  image: state.questionData.image,
  answer: state.questionData.answer,
  error: state.questionData.error,
  loading: state.questionData.loading
});

export default connect(mapStateToProps)(Dashboard);

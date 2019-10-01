import React from 'react';

class CourseList extends React.Component {
    handleChangeView = (props) =>{
      this.props.changeView(props);
    }
    render() {
      return (<div className="courseutility">
          <div className="question">What would you like to do in {this.props.name}?</div>
          <div className="newRound utility" onClick={() =>{this.handleChangeView(["newround", this.props.name, this.props.holes])}}>Start a new round</div>
          <div className="modify utility">Modify the course</div>
      </div>);
    }
  }
  export default CourseList;
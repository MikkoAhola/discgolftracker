import React from "react";
import CourseList from "./CourseList";

class CourseSelect extends React.Component {
  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  render() {
    return (
    <div className="course-select">
        <div className="course-select-guide">Select a course:</div>
        <CourseList changeView={this.props.changeView} courseData={this.props.courseData}></CourseList>
    </div>
    );
  }
}
export default CourseSelect;

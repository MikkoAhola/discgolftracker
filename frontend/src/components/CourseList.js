import React from "react";
import CourseItem from "./CourseItem";

class CourseList extends React.Component {
  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  render() {
    let courseList = this.props.courseData.map(course => {
      return <CourseItem name={course.name} holes={course.holes} par={course.par} key={course.id} changeView={this.props.changeView}/>;
    });

    return <div className="courselist-container">{courseList}</div>;
  }
}
export default CourseList;

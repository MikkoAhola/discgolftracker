import React from "react";

class CourseItem extends React.Component {
  
  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  render(){
  return (
    <div className="button courseitem" onClick={() =>{this.handleChangeView(["newround", this.props.name, this.props.holes, this.props.par])}}>
      <div className="course-name">{this.props.name}</div>
      <div className="course-holes">{this.props.holes}</div>
    </div>
  );
  }
}
export default CourseItem;

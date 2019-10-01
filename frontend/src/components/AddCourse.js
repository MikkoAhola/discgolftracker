import React from "react";

class AddCourse extends React.Component {
  state = {
    courseName: "",
    par: [],
    holeCount: 9
  };
  handleChange = event => {
    this.setState({ courseName: event.target.value });
  };
  handleHoleCountChange = props => {
    let holeCountCopy = this.state.holeCount;
    holeCountCopy = props;
    this.setState({ holeCount: holeCountCopy });
  };
  handleSaveCourse = () => {
    let parElementList = document.querySelectorAll(".holepar");
    let parList = [];
    for (let i = 0; i < parElementList.length; i++) {
      parList.push(parElementList[i].value);
    }
    let newCourse = {
      id: this.props.createCourseId(),
      name: this.state.courseName,
      holes: this.state.holeCount,
      par: parList
    };
    this.props.saveCourse(newCourse);
  };
  render() {
    let holelist = [];
    holelist.push(
      <div className="hole" key="holeinfo">
        <div className="holeinfo">hole</div>
        <div className="parinfo">par</div>
      </div>
    );
    for (let i = 0; i < this.state.holeCount; i++) {
      holelist.push(
        <div className="hole" key={"hole" + i}>
          <div className="holenumber">{i + 1}</div>
          <input className="holepar" />
        </div>
      );
    }

    return (
      <div className="addcourse">
        <label className="addcourse-coursename" htmlFor="coursename">
          Course Name:{" "}
        </label>
        <input
          id="coursename"
          className="addcourse-coursename-input"
          value={this.state.courseName}
          onChange={this.handleChange}
          required={true}
        />
        <div className="lengthquestion">Holes on the course:</div>
        <div className="courselength-select">
          <div
            className="courselength button"
            onClick={() => {
              this.handleHoleCountChange(9);
            }}
          >
            9
          </div>
          <div
            className="courselength button"
            onClick={() => {
              this.handleHoleCountChange(18);
            }}
          >
            18
          </div>
          <div
            className="courselength button"
            onClick={() => {
              this.handleHoleCountChange(21);
            }}
          >
            21
          </div>
        </div>
        <div className="holelist">{holelist}</div>
        <div
          className="savecourse button"
          onClick={() => {
            if (document.querySelector("#coursename").validity.valid) {
              this.handleSaveCourse();
            } else {
              alert("Fill in course name!");
            }
          }}
        >
          Save course
        </div>
      </div>
    );
  }
}
export default AddCourse;

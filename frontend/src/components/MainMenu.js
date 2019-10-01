import React from "react";

class MainMenu extends React.Component {
  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  render() {
    return (
      <div className="mainMenu">
        <div className="utility-container">
          <div className="newRound-select button" onClick={()=>{this.handleChangeView(["course-select"])}}>New round</div>
          <div className="addcourse-select button" onClick={()=>{this.handleChangeView(["addcourse"])}}>New course</div>
          <div className="scores-select button" onClick={() =>{this.handleChangeView(["scores"])}}>Scores</div>
        </div>
      </div>
    );
  }
}
export default MainMenu;

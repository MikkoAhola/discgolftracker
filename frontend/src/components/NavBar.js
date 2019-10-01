import React from "react";

class NavBar extends React.Component {
  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  render() {
    return (
      <div className="navbar">
          <div className="home nav" onClick={() =>{
              //pitäisi rakentaa varmistus jolla varmistetaan että käyttäjä haluaa poistua tietyistä tilanteista
              this.handleChangeView(["mainMenu"])
              }}>Home</div>
          <div className="theme nav"></div>
          <div className="settings nav"></div>
      </div>
    );
  }
}
export default NavBar;

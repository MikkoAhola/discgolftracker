import React from 'react';
//maps data and creates ScoreItem components with pieces of data within them
class ScoreItem extends React.Component {

  

  render() {
    
    let rank = "";
    if(this.props.scoreFromPar > 15) rank = "bronze"
    else if (this.props.scoreFromPar > 5)rank = "silver"
    else if (this.props.scoreFromPar > -5) rank = "gold"
    else rank = "plat"

    return (
      <div className={"scoreitem " + rank}>
      <div className="scoreitem-course">
      <div className="scoreitem-coursename">{this.props.name}</div>
      <div className="scoreitem-date">{this.props.date}</div>
      </div>
      <div className="scoreitem-score">Score: {this.props.score}</div>
      <div className="scoreitem-scorefrompar">Score from par: {this.props.scoreFromPar > 0 ? '+':null}{this.props.scoreFromPar}</div>
    
      </div>
    );
  }
}
export default ScoreItem;
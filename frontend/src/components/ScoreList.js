import React from "react";
import ScoreItem from "./ScoreItem";

//maps data and creates ScoreItem components with pieces of data within them
class ScoreList extends React.Component {
  render() {
    return (
      <div className="scorelist">
        {this.props.scoreData.map(score => {
          return (
            <ScoreItem
              name={score.course}
              score={score.score}
              scoreFromPar={score.scoreFromPar}
              date={score.date}
              key={score.id}
            ></ScoreItem>
          );
        })}
      </div>
    );
  }
}
export default ScoreList;

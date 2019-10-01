import React from "react";

class ScoreCounter extends React.Component {
    state = {holeScore: 0}

  handleChangeView = (props) =>{
    this.props.changeView(props);
  }

  handleSaveHole = (props) =>{
    this.props.saveHole(props);
    let setHole = this.props.holes[this.props.currentHole + props[1]];
    this.setState({holeScore: setHole});
  }

  handlePlusMinus = (props) =>{
    let newHoleScore = this.state.holeScore;
    newHoleScore = newHoleScore +props;
    this.setState({holeScore: newHoleScore})
    this.props.totalPlusMinus(props);
  }
  handleEndRound = () =>{
    this.props.endRound();
  }

  render() {
    return (
      <div className="scorecounter">
          <div className="plus" onClick={()=>{this.handlePlusMinus(1)}}>+1</div>
          <input type="number" className="holescore" onChange={(e)=>{this.setState({holeScore: e.target.value})}}value={this.state.holeScore}></input>
          <div className="minus" onClick={()=>{this.handlePlusMinus(-1)}}>-1</div>

              {this.props.currentHole < this.props.holes.length -1 ? <div className="next" onClick={()=>{
                this.handleSaveHole([this.state.holeScore, 1])
                }}></div> : <div className="stop" onClick={()=>{
                  this.handleSaveHole([this.state.holeScore, 0]);
                  this.handleEndRound();
                  }}>Finish</div>}

              {this.props.currentHole >0 ?<div className="prev" onClick={()=>{
                this.handleSaveHole([this.state.holeScore, -1])
                }}></div>:null}
      </div>
    );
  }
}
export default ScoreCounter;

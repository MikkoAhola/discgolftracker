import React from "react";
import ScoreCounter from './ScoreCounter';

class NewRound extends React.Component {
  state = {
    courseName: this.props.name ,
    holeCount: parseInt(this.props.holes),
    holes: [],
    totalScore: 0,
    totalFromPar: 0,
    currentHole: 0
  };

  totalPlusMinus = (props) =>{
    let newTotal = this.state.totalScore;
    newTotal = newTotal + props;
    this.setState({totalScore: newTotal});
  }

  handleChangeView = (props) =>{
    this.props.changeView(props);
  }
  saveHole = (props) =>{
    let holesCopy = this.state.holes;
    holesCopy[this.state.currentHole] = props[0];
    this.setState({holes : holesCopy});
    let currentHoleCopy = this.state.currentHole;
    currentHoleCopy = currentHoleCopy +props[1];
    this.setState({currentHole: currentHoleCopy});
    
    let newTotalFromPar = this.state.totalFromPar;
    if(props[1] === -1){
      newTotalFromPar = 0;
      for(let i = 0; i < this.state.currentHole-1; i++){
        //voisi käytttää holes ja par taulukoita nykyisen parin laskemiseen
        newTotalFromPar= newTotalFromPar + (this.state.holes[i] - this.props.par[i])
      }
    }else{
      newTotalFromPar = newTotalFromPar - this.props.par[this.state.currentHole] + props[0];
    }
    this.setState({totalFromPar: newTotalFromPar});
  }
  endRound = () =>{
    let roundStats = {
      courseName : this.state.courseName,
      holeCount: this.state.holeCount,
      holes: this.state.holes,
      par: this.props.par,
      totalScore: this.state.totalScore,
      scoreFromPar: this.state.totalFromPar
    }
    this.props.endRound(roundStats);
    this.handleChangeView(["results"]);
  }

  //alustaa väylien määrän
  componentDidMount(){
    let holesNew = [];
    for( let i = 0; i < parseInt(this.props.holes); i++){
      holesNew.push(0);
    }
    this.setState({holes: holesNew});
  }

  render() {
    return (
      <div className="newround">
        <div className="info">
          <div className="info-coursename">{this.state.courseName}</div>
          <div className="info-currenthole">{this.state.currentHole+1} / {this.state.holeCount}</div>
          <div className="info-currenthole-par">Par: {this.props.par[this.state.currentHole]}</div>
        </div>
        <ScoreCounter 
          holeScore={this.state.holes[this.state.currentHole]}
          saveHole={this.saveHole} holes={this.state.holes}
          currentHole={this.state.currentHole}
          totalPlusMinus={this.totalPlusMinus}
          totalScore={this.state.totalScore}
          endRound={this.endRound}
          >
          </ScoreCounter>
          <div className="currentscore">Score: {this.state.totalFromPar > 0 ? '+' :null}{this.state.totalFromPar}</div>
      </div>
    );
  }
}
export default NewRound;
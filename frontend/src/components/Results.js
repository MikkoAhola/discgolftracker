import React from 'react';

class ScoreList extends React.Component {

    handleSaveRound = () =>{
        this.props.saveRound()
    }
    countPar = () =>{
      let newPar = 0;
      for(let i = 0; i < this.props.roundStats[0].holes.length ; i++){
        newPar = newPar - this.props.roundStats[0].par[i] + this.props.roundStats[0].holes[i];
      }
      if(newPar > 0) newPar =`+${newPar}`
      //newpar on STRING!!
      return newPar;
    }

    render() {
      return (
        <div className="results">
            <div className="results-coursename">{this.props.roundStats[0].courseName}</div>
            <div className="results-totalscore">Total: {this.props.roundStats[0].totalScore}</div>
            <div className="results-totalpar">(+-par): {this.countPar()}</div>
            <div className="results-holes-container">
              <div className="results-holes-text">Holes:</div>
              <div className="results-holes">{this.props.roundStats[0].holes.map((hole, index)=>{
                return (<div className="results-hole" key={index}>
                  <div className="hole-number">{index+1}</div>
                  <div className="hole-score">{hole}</div>
                </div>);
              })}</div>
            </div>
            <div className="back-home button" onClick={()=>{this.handleSaveRound()}}>Save and go home</div>
        </div>
      );
    }
  }
  export default ScoreList;
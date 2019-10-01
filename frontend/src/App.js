import React, { Component } from "react";
import axios from "axios";

import MainMenu from "./components/MainMenu";
import ScoreList from "./components/ScoreList";
import NavBar from "./components/NavBar";
import NewRound from "./components/NewRound";
import Results from "./components/Results";
import CourseSelect from "./components/CourseSelect";
import AddCourse from "./components/AddCourse";

//TODO:
//Kirjautumissivu

//Aloitussivu josta voi valita radan, lisätä muokata tai poistaa ratoja tai selata vanhoja tuloksia

//kun radan valitsee, näytetään sivu jossa on radan nimi, radan väylien par ja ALOITA NAPPI

//Aloitettua, näytetään sivu, jolla näkyy nykyinen yhteistulos +-0, nykyisen väylän numero ja par ja input jonka vasemmalla puolella on -1-2-3 ja oikealla puolella +1+2+3
//sivulla myös edellinen ja seuraava nuoli
//viimeisen väylän kohdalla tulee TULOKSET NAPPI, jota painamalla saa tarkemmat tulokset(jokainen väylä erikseen, yhteistulos heitoissa ja +-par)
//tulokset ikkunassa on LOPETA NAPPI, jolla pääsee takaisin aloitusnäytölle.
class App extends Component {
  state = {
    currentView: "mainMenu",
    courseName: "",
    holes: "",
    par: [],
    roundStats: [],
    courseData: [],
    scoreData: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/coursedata").then(res => {
      if (res.status === 200) {
        this.setState({ courseData: res.data });
      }
    });
    axios.get("http://localhost:5000/scoredata").then(res => {
      if (res.status === 200) {
        this.setState({ scoreData: res.data });
      }
    });
  }

  changeView = event => {
    this.setState({ currentView: event[0] });
    if (event[1]) this.setState({ courseName: event[1] });
    if (event[2]) this.setState({ holes: event[2] });
    if (event[3]) this.setState({ par: event[3] });
  };

  endRound = props => {
    let newRoundStats = [];
    newRoundStats.push(props);
    this.setState({ roundStats: newRoundStats });
  };
  countPar = () => {
    let newPar = 0;
    for (let i = 0; i < this.state.roundStats[0].holes.length; i++) {
      newPar =
        newPar -
        this.state.roundStats[0].par[i] +
        this.state.roundStats[0].holes[i];
    }
    return newPar;
  };
  createScoreId = () => {
    let maxId = -Infinity;
    for (let i = 0; i < this.state.scoreData.length; i++) {
      if (this.state.scoreData[i].id >= maxId)
        maxId = parseInt(this.state.scoreData[i].id) + 1;
    }
    return maxId;
  };

  saveRound = () => {
    let scoreFromPar = this.countPar();
    let scoreDataCopy = this.state.scoreData;
    let d = new Date();
    let newScore = {
      id: this.createScoreId(),
      course: this.state.roundStats[0].courseName,
      score: this.state.roundStats[0].totalScore,
      scoreFromPar: scoreFromPar,
      date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
    };
    scoreDataCopy.push(newScore);
    this.changeView(["mainMenu"]);
    axios.post("http://localhost:5000/savescore", { newScore }).then(res => {});
  };
  createCourseId = () => {
    let maxId = -Infinity;
    for (let i = 0; i < this.state.courseData.length; i++) {
      if (this.state.courseData[i].id >= maxId)
        maxId = this.state.courseData[i].id + 1;
    }
    return maxId;
  };
  saveCourse = newCourse => {
    let courseDataCopy = this.state.courseData;
    courseDataCopy.push(newCourse);
    this.setState({ courseData: courseDataCopy });
    axios
      .post("http://localhost:5000/savecourse", { newCourse })
      .then(res => {});
    this.changeView(["mainMenu"]);
  };

  render() {
    return (
      <div className="App">
        <NavBar
          changeView={this.changeView}
          currentView={this.state.currentView}
        />
        {this.state.currentView === "mainMenu" ? (
          <MainMenu
            changeView={this.changeView}
            courseData={this.state.courseData}
          />
        ) : null}
        {this.state.currentView === "addcourse" ? (
          <AddCourse
            createCourseId={this.createCourseId}
            saveCourse={this.saveCourse}
          />
        ) : null}
        {this.state.currentView === "scores" ? (
          <ScoreList scoreData={this.state.scoreData} />
        ) : null}
        {this.state.currentView === "course-select" ? (
          <CourseSelect
            changeView={this.changeView}
            courseData={this.state.courseData}
          />
        ) : null}
        {this.state.currentView === "newround" ? (
          <NewRound
            name={this.state.courseName}
            holes={this.state.holes}
            par={this.state.par}
            endRound={this.endRound}
            changeView={this.changeView}
          />
        ) : null}
        {this.state.currentView === "results" ? (
          <Results
            roundStats={this.state.roundStats}
            saveRound={this.saveRound}
          />
        ) : null}
      </div>
    );
  }
}

export default App;

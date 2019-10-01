const express = require("express");
const app = express();
const fs = require("fs");

const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const port = 5000;

app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Auhtorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/courseData", (req, res) => {
  fs.readFile("db/courses.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    let courseData = JSON.parse(data);
    res.send(courseData.courseData);
  });
});
app.get("/scoreData", (req, res) => {
  fs.readFile("db/scores.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    let scoreData = JSON.parse(data);
    res.send(scoreData.scoreData);
  });
});

app.post("/saveScore", (req, res) => {
  let scoreData = [];
  fs.readFile("db/scores.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    scoreData = JSON.parse(data);
    let newScore = req.body.newScore;
    scoreData.scoreData.push(newScore);
    let dataToWrite = JSON.stringify(scoreData, null, 2);

    fs.writeFile("db/scores.json", dataToWrite, err => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      console.log("Score saved");
      res.sendStatus(200);
    });
  });
});

app.post("/savecourse", (req, res) => {
  let courseData = [];
  fs.readFile("db/courses.json", "utf8", (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    courseData = JSON.parse(data);
    let newcourse = req.body.newCourse;
    courseData.courseData.push(newcourse);
    let dataToWrite = JSON.stringify(courseData, null, 2);

    fs.writeFile("db/courses.json", dataToWrite, err => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      console.log("course saved");
      res.sendStatus(200);
    });
  });
});
//update
//update 2.0
//update 3.0

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

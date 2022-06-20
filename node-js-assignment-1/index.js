// const express = require('express');
// const expressApp = express();
// or
// above both lines of code (importing and using it as an expressApp) in a single line.
const expressApp = require("express")();

expressApp.listen(1234, () => {
  console.log(`The code is docked at port 1234 and is up and running.`);
});

count = 0;

expressApp.get("/", (req, res) => {
  //   res.send("lol");
  res.status(200).send({
    status: `Hi, welcome to express server. available routes are: -> '/', '/counter', 'time'`,
  });
});

// expressApp.get("/", function (req, res, next) {
//   res.render("index", {
//     title: "Welcome to AJ homepage",
//   });
// });

expressApp.get("/counter", (req, res) => {
  //   res.send("lol");
  count += 1;
  res.status(200).send({
    status: `count is : ${count}`,
  });
});

expressApp.get("/time", (req, res) => {
  var nowDate = new Date();
  res.status(200).send({
    status: `Current time is : ${
      nowDate.getHours() +
      ":" +
      nowDate.getMinutes() +
      ":" +
      nowDate.getSeconds()
    }`,
  });
});

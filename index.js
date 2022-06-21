// const express = require('express');
// const expressApp = express();
// or

// const { application } = require("express");

// above both lines of code (importing and using it as an expressApp) in a single line.
const expressApp = require("express")();
// make use of statuc and json from express
const { json, static } = require("express");
const join = require("path");
const raw = require("express").raw;
const urlEncoded = require("express").urlencoded;

// set the view engine as pug
expressApp.set("view engine", "pug");
// use the static files in the folder "views".
expressApp.use(static("views"));

// by default data cannot be parsed so we have to use this middleware functions
// make express to recieve any type of data.
// raw type data
// expressApp.use(raw({ type: "multipart/form-data", limit: "10mb" }));
// JSON type data
expressApp.use(json());
// urlencoded type data
// expressApp.use(urlEncoded({ extended: true }));

expressApp.listen(1234, () => {
  console.log(`The code is docked at port 1234 and is up and running.`);
});

count = 0;

expressApp.get("/status", (req, res) => {
  //   res.send("lol");
  res.status(200).send({
    status: `Hi, welcome to express server. available routes are: -> '/', '/counter', 'time'`,
  });
});

// pug
expressApp.get("/", (_, res) => {
  //   res.send("lol");
  // res.status(200).render("home", {
  //   title: `Zensark Ecom`,
  //   message: "Welcome to Zesark Ecom using PUG",
  // });
  const data = {
    title: `Zensark Ecom`,
    message: "Welcome to Zesark Ecom using PUG",
    actionUrl: "https://google.com",
    day: 1,
    from: 1,
    to: 10,
    names: ["John", "Doe", "Smith"],
    user: {
      name: "John",
      age: "16",
    },
  };
  res.status(200).render("home", data);
});

expressApp.get("/profile", (_, res) => {
  const data = {
    title: `Profile`,
    users: [
      {
        pic: "naruto.jpg",
        fname: "Naruto",
        lname: "Uzumaki",
        email: "narutoUzumaki@konoha.com",
        addresses: ["Wind village", "Jinchuriki street"],
      },
      {
        pic: "tsunade.jpg",
        fname: "Tsunade",
        lname: "Senju",
        email: "tsunadeSenju@konoha.com",
        addresses: ["Sage street", "Healing street"],
      },
      {
        pic: "sasuke.jpg",
        fname: "Sasuke",
        lname: "Uchiha",
        email: "sasukeUchiha@konoha.com",
        addresses: ["Sharingan street", "Fire street"],
      },
      {
        pic: "kakashi.jpg",
        fname: "Kakashi",
        lname: "Hatake",
        email: "kakashiHatake@konoha.com",
        addresses: ["Lightning street", "Semi-sharingan street"],
      },
      {
        pic: "jiraiya.jpg",
        fname: "Jiraiya",
        lname: "Uzumaki",
        email: "jiraiyaUzumaki@konoha.com",
        addresses: ["Yin-Yang street", "Toad street"],
      },
    ],
  };
  res.status(200).render("profile", data);
});

// query params
expressApp.get("/query", (req, res) => {
  //   res.send("lol");
  res.status(200).send({
    status: `Hi, welcoome to query route`,
    query: req.query,
  });
});

// General HTTP Codes :
// 200 : generally indicates success - >most common are 200 -> GET/PUT/PATCH , 201 -> POST
// 300 : Redirect (Temporary or Permanent)
// 400 : Bag Request/ Client Error -> 401/403 -> Forbidden, 404 -> Route not found
// 500 : Internal Server Error

expressApp.post("/post", (req, res) => {
  console.log(req.body.toString());
  res.status(201).send({
    status: "OK, Post sent successfully",
    body: req.body,
  });
});

expressApp.get("/html", (req, res) => {
  // console.log(req.body.toString());
  res.status(200).send("<h1 style='color:red'>Hello HTML</h1>");
});

expressApp.get("/htmlfile", (req, res) => {
  // console.log(req.body.toString());
  const htmlPath = join.join(__dirname, "home.html");
  console.log(htmlPath);
  res.status(200).sendFile(htmlPath);
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

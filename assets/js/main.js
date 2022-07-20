// const { Socket } = require("socket.io");
var postSendingDisplay = false;
// var allPeople = true;

function openPostSending(event) {
  console.log(postSendingDisplay);
  postSendingDisplay = true;
  console.log(postSendingDisplay);
}

function clickConsole(event) {
  console.log("Yaaaay.. I have been clicked.");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:1234/chat/post");
  xhr.onload = () => console.log(xhr.responseText);
  const chatId = "62cbb5c35cf59b6c59f92f09";
  const lol = JSON.stringify(chatId);
  xhr.send(lol);
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-65px";
  }
  prevScrollpos = currentScrollPos;
};

// var socket = Socket.io();

// Socket.on("Hi", () => {
//   window.location.href = "http://localhost:1234/chat";
// });

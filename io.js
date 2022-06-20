var name;
var userName
// var is optional. var => variable.
name = "Javascript";
// document.write("Hello from " + name);
console.log("Hello from " + name);

// userName = prompt("Enter your name: ");
// document.write("Your name is: " + userName);
var inputBox = document.getElementById("userNameID");
document.write("<br />");
document.write("<br />");

document.write("Your name is: " + inputBox.value);
document.write("<br />");

inputBox.value = "Changed value !";
document.write("<br />");

document.write("Value after update: " + inputBox.value);
inputBox.style.color = "red";


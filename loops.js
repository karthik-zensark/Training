var names = ["Ram", "Rahim", "Joseph", "Jenis", "Sukhvinder"];
names.push("Karthik");

// using Index
// prints the element in the array -> names at 4th posiition
console.log(names[3]);
// Manipulating the element at a particular position
names[3] = "Jennifer";
// Adding the elements in an array
// using push function
names[6] = "pegasus";
names[7] = "naruto";
names.push["Lol", "pavan"];

// Popping the elements
// Pop's the element at final position
names.pop();

var array = [];

// Loops

// do-while loop
console.log("Using do-while loop");
var a = 10;
do {
    console.log("The value of a is (using do-while loop): ", a);
    a++;
} while (a <= 10);

// while loop
console.log("Using While loop");
a = 1;
while (a <= 10) {
    console.log("The value of a is (using while loop): ", a);
    a++;
};

// for loop
console.log("Using For loop");
for (var i = 0; i <= 10; i++) {
    console.log("The values of i (using for loop) is: ", i);
};

// for in
// Iterates through the keys of the array
console.log("using for in loop (Iterates through the keys)");
for (var name in names) {
    console.log("The key is: ", name);
};

// for of
// Iterates through the values of the array
console.log("Using for of (Iterates through the values)");
for (var name of names) {
    console.log("The value is: ", name);
};

// Objects

const list1 = [1, 2, 3, 4, 5];

// List 2 is a combination of list1 and some other elements.
// 1st way to acheive the above result.
const list2 = list1.concat(6, 7);
// 2nd way to do the same.
// Using Spread operator.
const list3 = [...list1, 6, 7];
list4 = [];
console.log(
  `List1 is : ${list1}\n, list2 is : ${list2}\n, list3 is : ${list3}`
);

const [a, b, ...other] = list3;
console.log(`list4 is : ${list4}\n, a = ${a}\n, b = ${b}\n, other = ${other}`);

const person = {
  name: "John Doe",
  age: 34,
  email: "John@example.com",
};

// This does not work -> It needs an iterable to work. i.e on Arrays/Lists
// console.log(`person is : `, ...person);

// Iterating through the properties of the object.
console.log("person is:", ...Object.keys(person));

// Using spread operator in functions in order to provide arguments.
function names(name1, name2, ...otherNames) {
  console.log(
    `name1 : ${name1}, name2 : ${name2}, ...otherNames:`,
    ...otherNames
  );
}

names("lol", "lol1", ["hol", "Biscuit"]);

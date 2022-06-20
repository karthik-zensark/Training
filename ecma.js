// Normal Javascript variable, Scoped Globally
var name = "Node JS";

// Constant value, must be assigned at declaration, can't be re-assigned.
const greeting = "Hello";

// Scoped Variables
{
  // Variables declared using var are Globally accessible by default even if declared in a scope.
  var glob = 10;
  // Variables declared using let are local and are only accessib;e in the scope.
  let age = 12;
  console.log(`Age: ${age}`);
}

console.log(`glob: ${glob}`);

// Defining a class.
class Person {
  name;
  age;
  gender;

  // defining constructor for a class. (Initializing the properties)
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  // function written in this class. -> accessible using this class.
  print() {
    console.log(`Name: ${this.name}\nAge: ${this.age}\nGender: ${this.gender}`);
  }

  greet() {
    console.log("Outside", this);
    // If Arrow funcions are not used the scope of "this" gets changed and we cannot get the name from the class.
    setTimeout(() => {
      console.log("Inside", this);
      console.log(`${this.name} says Hello to everyone..`);
    }, 1000);

    // Earlier this was the workaround to pass the earier existing scope of "this" -> i.e to store the earlier scope of this in a keyword and us that variable in access the same existing earlier scope of ealier "this".
    // const that = this;
    // setTimeout(function () {
    //   console.log(`${that.name} says Hello to everyone..`);
    // }, 1000);
  }
}

// Defining a new person class.
const ramesh = new Person("RAMESH", 26, "Male");
// Using the function of the above class.
ramesh.print();
ramesh.greet();

const myObj = {
  key: "value1",
  key2: "value2",
};

console.log(`First key is : ${myObj.key}\n Second key is : ${myObj.key2}`);

// Destructuring an object. Taking only the required properties from an object.
// Stores the values of the particular "keys"
const { key, key2 } = myObj;

console.log(
  `Destructured first key is : ${key}\n Destructured second key is : ${key2}`
);

// Structuring
const personName = "Node JS";
const age = 12;
const details = "The best guy on the block";

const nodeObj = {
  name: personName,
  age,
  details,
};

console.log(nodeObj);

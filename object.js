var student = {
    name: 'Karthik',
    batch: "B.tech 1",
    address: "Hyderabad"
};

var x = [1, 2, 3];

console.log(student);
// Reading properties in an object.
console.log("The name of the student from 'student object' is: ", student.name);

console.log("Type of the student is: ",typeof student);
console.log("The type of 'x' is: ", typeof x);

if (typeof x == "object" && typeof student == "object") {
    console.log("Woah!! both are objects");
}

//  Checking whether the array is an array or not.
//  Using Array.isArray() to check.

console.log("x is: ", Array.isArray(x));
console.log('student is: ', Array.isArray(student));
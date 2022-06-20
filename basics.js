// Mathematical operators => +, -, *, /, %
// Logical operators => ==, !=, !==

var a = 10;
var b = 20;
var c = a + b;
var d = a - c;

// logical 

// equality
var e = a == b;

// inequaity
var f = a != b;

// inversion
var g = !f;

// comparing values
var h = a > b;
var i = a < b;

// comparing values with types
var j = a === b;
var k = a !== b;

if (a < 10) {
    console.log ("False, Value of a is:", a);
} else if (a == 10) {
    console.log ("True, Value of a is:", a);
} else {
    console.log("False, Value of a is not 10 at all.");
}

number = 10;
//  Checking Odd/Even using ternary operator
console.log(number % 2 == 0 ? 'Even' : 'Odd');

// Switch case
var day = 1;
switch(day) {
    case 1: 
        console.log("It's Monday");
        break;
    case 2: 
        console.log("It's Tuesday");
        break;
    case 3: 
        console.log("It's Wednesday");
        break;
    case 4: 
        console.log("It's Thursday");
        break;
    case 5: 
        console.log("It's Friday");
        break;
    case 6: 
        console.log("It's Saturday");
        break;
    default:
        console.log("It's Sunday");
        break;
}

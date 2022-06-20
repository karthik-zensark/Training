// Array declaration (Empty array)
// numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numberList = [];
oddNum = [];
evenNum = [];
primeNum = [];
outputConditionals = ["odd", "even", "prime"];
for (numPush = 0; numPush < 10; numPush++) {
  var promptInt = parseInt(prompt("Enter the numbers: "));
  numberList.push(promptInt);
}
console.log(numberList);
// for (numInt = 0; numInt < numberList.length; numInt++) {
//   console.log(numberList[numInt]);
//   if (
//     numberList[numInt] == NaN ||
//     numberList[numInt] == null ||
//     numberList[numInt] == undefined
//   ) {
//     console.log("If");
//     numberList = [];
//     numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   }
// }
for (con = 0; con < outputConditionals.length; con++) {
  // console.log(outputConditionals[con]);
  switch (outputConditionals[con]) {
    case "odd": {
      for (numInt = 0; numInt <= numberList.length; numInt++) {
        if (numberList[numInt] % 2 == 0) {
          evenNum.push(numberList[numInt]);
        } else if (numberList[numInt] % 2 == 1) {
          oddNum.push(numberList[numInt]);
        }
      }
      console.log("even numbers are", ...evenNum);
      console.log("odd numbers are", ...oddNum);
      break;
    }
    case "prime":
      {
        for (numInt = 0; numInt < numberList.length; numInt++) {
          tempArray = [];
          tempArray2 = numberList;
          for (tempInt = 0; tempInt < tempArray2.length; tempInt++) {
            if (numberList[numInt] % tempArray2[tempInt] == 0) {
              tempArray.push(tempArray2[tempInt]);
            }
          }
          // console.log(tempArray);
          if (tempArray.length < 3 && numberList[numInt] > 1) {
            primeNum.push(numberList[numInt]);
          }
        }
        console.log("prime numbers are: ", ...primeNum);
      }
      // case "prime":
      //   {
      //     for (numInt = 0; numInt < numberList.length; numInt++) {
      //       if (numberList[numInt] > 1) {
      //         for (tempInt = 2; tempInt < numberList[numInt]; tempInt++) {
      //           if (numberList[numInt] % tempInt == 0) {
      //             break;
      //           } else {
      //             // if (numberList[numInt] in numberList) {
      //             //   break;
      //             // } else {
      //             primeNum.push(numberList[numInt]);
      //             // }
      //             // console.log(numbe)
      //           }
      //         }
      //       }
      //     }
      //     console.log("prime numbers are: ", ...primeNum);
      //   }
      break;
  }
}

5;
2;

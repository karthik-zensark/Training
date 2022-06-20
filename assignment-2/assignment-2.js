calcArray = [];
mulArray = [];
addArray = [];
resultArray = [];

function calcChange(event) {
  console.log(event);
  value = event.srcElement.innerText;
  console.log(value);
  outputDiv = document.getElementById("input_box");
  console.log(outputDiv);
  if (outputDiv.value == "") {
    outputDiv.value = value;
  } else {
    outputDiv.value = outputDiv.value + value;
  }
  //   outputDiv.innerText = value;
  //   outputDiv.innerHTML = value;
  mulArray = outputDiv.value.split("*");
  console.log("mul array is :", mulArray);

  //   calcArray.push(outputDiv.value);
  //   console.log(calcArray);
  console.log("outputdiv value is:", outputDiv.value);
  //   srcElement.innerText;
}

function mulCalc(event) {
  var mulRes;
  if (mulArray.length > 1) {
    for (i = 0; i < mulArray.length; i++) {
      if (mulArray[i] != "") {
        mint = parseInt(mulArray[i], 10);
        mulRes = mint * mint;
      }
    }
    resultArray.push(mulRes);
    console.log("result: ", resultArray);
  }
}

function calcDel(event) {
  console.log(event);
  value = event.srcElement.innerText;
  console.log(value);
  outputDiv = document.getElementById("input_box");
  console.log(outputDiv);
  outputDiv.value = "";
  //   outputDiv.innerText = value;
  //   outputDiv.innerHTML = value;
  console.log(outputDiv);
  //   srcElement.innerText;
}

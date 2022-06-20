lol = [];
contentLoaded = false;
renderButtonClicked = false;
cont = document.getElementById("content");
products = document.getElementById("products");
ele = document.getElementById("spinner");
var count = 0;

isContentLoaded();
// bucketList.style.display = "none";

function isContentLoaded() {
  if (contentLoaded == false && renderButtonClicked == false) {
    // ele.style.display = "none";
    // cont.innerHTML = "Loading ....";
    // products.innerHTML = "Products not loaded yet.";
  } else if (contentLoaded == false && renderButtonClicked == true) {
    products.classList.add("spinner");
    // ele.style.display = "block";
    cont.innerHTML = "loading ....";
  } else if (contentLoaded == true && renderButtonClicked == true) {
    products.classList.remove("spinner");
    // ele.style.display = "none";
    cont.innerHTML = "content has been loaded successfully";
  }
}

async function renderData() {
  renderButtonClicked = true;
  isContentLoaded();

  try {
    var products = fetch("https://fakestoreapi.com/products");
    var jsonPromise = products.then(toJson).catch(failure);
    var finalPromise = jsonPromise.then(complete).catch(failure);
    console.log(products);
  } catch (err) {
    console.log(err);
  }
}

function toJson(response) {
  //   lol = response.json();
  //   cont.innerHTML = response.json();
  return response.json();

  //   console.log(lol);
  //   return response.json();
}

function complete(res) {
  contentLoaded = true;
  lol = res;
  isContentLoaded();
  products.innerHTML = "";
  res.forEach((element) => {
    console.log(element);
    var tileHolder = document.createElement("div");
    var infoHolder = document.createElement("div");
    var imgHolder = document.createElement("div");
    var title = document.createElement("h5");
    title.draggable = true;
    var des = document.createElement("p");
    var img = document.createElement("img");
    tileHolder.classList.add("tileHolder");
    imgHolder.classList.add("imgHolder");
    infoHolder.classList.add("infoHolder");
    img.classList.add("imageStyler");
    title.innerText = element.title;
    des.innerText = element.description;
    img.src = element.image;
    products.appendChild(tileHolder);
    tileHolder.appendChild(imgHolder);
    imgHolder.appendChild(img);
    tileHolder.appendChild(infoHolder);
    infoHolder.appendChild(title);
    infoHolder.appendChild(des);

    title.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", event.target.innerText);
    });
  });
  console.log(res);
  //   console.log(lol.body);
}

function failure(err) {
  console.log(err);
}

function handleOnDrop(event) {
  // Get the drag data
  var data = event.dataTransfer.getData("text");
  var li = document.createElement("li");
  li.classList.add("bucketItem");
  li.innerText = data;
  bucketList.appendChild(li);
  count = count + 1;
  counter = document.getElementById("count");
  counter.innerText = count;
}

function allowDrop(event) {
  // cancel browsers default behaiour and allow the drop
  event.preventDefault();
}

function bucketHovered(event) {
  // bucketCount.style.display = "none";
  // bucketList.style.display = "block";
}

function bucketOut(event) {
  // bucketCount.style.display = "block";
  // bucketList.style.display = "none";
}

var bucket = document.querySelector(".bucketHolder");
var bucketCount = document.querySelector(".bucketCount");
var bucketList = document.querySelector(".bucketList");

// renderData();

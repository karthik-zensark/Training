// Create an express application
const app = require("express")();
const { profile } = require("console");
// JSON to parse the application/json body types
const { json, urlencoded, static } = require("express");
const { Db } = require("mongodb");

const { find, insert, insertMany, findOne, updateOne } = require("./db");

// Set default view engine to PUG
app.set("view engine", "pug");

// Set assets folder as static resource
app.use(static("assets"));

// Use json() to parse body
app.use(json());
// Use urlencoded() to parse form body
app.use(urlencoded({ extended: true }));

// The status route
app.get("/status", function (req, res) {
  res.status(200).send({
    status: "OK",
    clientIp: req.ip,
    query: req.query,
  });
});

// HTTP Status Code
// 2xx - Success 200
// 3xx - Redirect
// 4xx - Bad Request/Client Error
// 5xx - Internal Server Error

// The home route
app.get("/", async (__, res) => {
  try {
    const products = await find("products", {});
    const profile = await findOne("profile", {});
    res.status(200).render("home", { profile, products });
  } catch (err) {
    res.status(200).render("home", { error: err });
  }
});

app.get("/profile", async (__, res) => {
  try {
    const profile = await findOne("profile", {});
    var isEditable = false;
    res.status(200).render("profile", { profile, isEditable });
  } catch (err) {
    res.status(200).render("profile", { error: err });
  }
});

app.post("/profile", async (req, res) => {
  // const lol = await find("profile");
  // console.log(lol[0].addresses);
  // lol1 = lol[0].addresses;
  // lol3 = [];
  // for (let lol2 in lol1) {
  //   console.log(lol2);
  //   lol3.push(lol2);
  //   console.log(lol3);
  // }
  const { _id, name, avatar, add1, add2 } = req.body;
  // const lol = addresses.address
  try {
    // const lol = await client.db.collection("profile").distinct("addresses");
    // console.log(lol);
    // for (let add of lol) {
    //   let boom = await client.db.collection("profile").find({ add }).toArray();
    //   console.log(boom);
    // }
    const data = await updateOne("profile", _id, {
      name,
      avatar,
      "addresses.address1": lol1,
      "addresses.address2": lol2,
    });
    console.log(name, avatar, address1);
    if (data && data.modifiedCount) {
      res.redirect("/profile");
    } else {
      res.status(200).render("profile", { error: JSON.stringify(data) });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/product", async (req, res) => {
  try {
    const data = await insert("products", req.body);
    if (data && data.insertedId) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ data });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/products", async (req, res) => {
  try {
    const data = await insertMany("products", req.body);
    if (data && data.insertedCount) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ data });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// Start the express application
app.listen(1234, function () {
  console.log(`Server is running @ http://localhost:1234`);
});

// Create an express application
const app = require("express")();
// JSON to parse the application/json body types
const { json, static } = require("express");

const { find, insert, insertMany } = require("./db");

// Set default view engine to PUG
app.set("view engine", "pug");

// Set assets folder as static resource
app.use(static("assets"));

// Use json() to parse body
app.use(json());

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
    res.status(200).render("home", { products });
  } catch (err) {
    res.status(200).render("home", { error: err });
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

app.get("/profile", async (__, res) => {
  try {
    const users = await find("users", {});
    res.status(200).render("profile", { users });
  } catch (err) {
    res.status(200).render("profile", { error: err });
  }
});

app.post("/user-post", async (req, res) => {
  try {
    const data = await insert("users", req.body);
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

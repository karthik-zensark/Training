// Create an express application
const app = require("express")();
// JSON to parse the application/json body types
const { json, urlencoded, static } = require("express");
const { ObjectId } = require("mongodb");

const {
  find,
  insert,
  insertMany,
  findOne,
  updateOne,
  updateToDeleteOne,
} = require("./db");

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
    const cart = await findOne("cart", {});
    cartItems = 0;
    if (cart) {
      cart.productsArray.map((product) => {
        itemsInCart = cartItems + product.cartQuant;
        cartItems = itemsInCart;
        console.log(cartItems);
      });
    } else {
      cartItems = 0;
    }
    // cartItems = cart.productsArray.length;
    res.status(200).render("home", { profile, products, cartItems });
  } catch (err) {
    res.status(200).render("home", { error: err });
  }
});

app.get("/profile", async (__, res) => {
  try {
    const profile = await findOne("profile", {});
    res.status(200).render("profile", { profile });
  } catch (err) {
    res.status(200).render("profile", { error: err });
  }
});

app.get("/cart", async (__, res) => {
  try {
    const cart = await findOne("cart", {});
    const profile = await findOne("profile", {});
    pricesArray = [];
    finalPrice = 0.0;
    initialPrice = 0.0;
    cartItems = 0;
    if (cart) {
      cart.productsArray.map((product) => {
        itemsInCart = cartItems + product.cartQuant;
        cartItems = itemsInCart;
        console.log(cartItems);
      });
    } else {
      cartItems = 0;
    }
    console.log(cartItems);
    cart.productsArray.map((product) => {
      productPrice = product.price * product.cartQuant;
      initialPrice = initialPrice + productPrice;
      console.log("initial price is : ", initialPrice);
      finalPrice = Math.round((initialPrice + Number.EPSILON) * 100) / 100;
    });
    console.log(finalPrice);
    res.status(200).render("cart", { cart, profile, finalPrice, cartItems });
  } catch (err) {
    res.status(200).render("cart", { error: err });
  }
});

app.post("/profile", async (req, res) => {
  const { _id, name, avatar } = req.body;
  try {
    const data = await updateOne("profile", _id, { name, avatar });
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

app.post("/cart-post", async (req, res) => {
  const { _id, _profid } = req.body;
  try {
    // console.log(_id);
    // console.log(_profid);
    const product = await findOne("products", { _id: ObjectId(_id) });
    const cart = await findOne("cart", {});
    // console.log(cart);
    // console.log(product);
    productsArray = [];
    // const cart = await findOne("cart", {})
    if (cart) {
      bla = _id;
      // console.log(bla);
      // console.log(product._id);
      final_id = "";
      // cart.productsArray.map(async (productExist) => {
      // console.log("product id is : ", productExist._id);
      // if (_id == productExist._id) {
      // product._id = new ObjectId();
      // if (bla == product._id) {
      //
      // TODO: This functionality is broken currently will be fixed soon.
      //
      // console.log("cart products array is: ", cart.productsArray);
      cart.productsArray.find((cartProd) => {
        if (cartProd._id == _id) {
          console.log("id found");
          final_id = cartProd._id;
        } else {
          console.log("id not found");
        }
        // console.log("cartProd are :", cartProd);
        // console.log("id and cartProd id are: ", _id, cartProd._id);
      });
      if (final_id == _id) {
        cart.productsArray.map((cartProd) => {
          if (final_id == cartProd._id) {
            console.log("if");
            cartProd.cartQuant += 1;
          }
        });
      } else {
        console.log("else");
        product.cartQuant = 1;
        cart.productsArray.push(product);
        // const data = await updateOne("cart", cart._id, cart);
      }
      const data = await updateOne("cart", cart._id, cart);
      // product.cartQuant += 1;
      // }
      // product.cartCount++;
      // const data = insert("cart", productsArray);
      // });
    } else {
      product.cartQuant = 1;
      productsArray.push(product);
      // console.log(productsArray);
      const data = insert("cart", { _profid, productsArray });
    }
    // }
    if (data && data.modifiedCount) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ data });
    }
  } catch (err) {
    // res.status(500).send({ err });
    // getCart();
    res.redirect("/");
  }
});

app.post("/cart-del-one", async (req, res) => {
  const { _id, _prodid } = req.body;
  try {
    console.log(_prodid);
    // console.log(_profid);
    // const product = await findOne("products", { _id: ObjectId(_prodid) });
    const cart = await findOne("cart", {});
    console.log(cart);
    // productsArray = [];
    if (cart) {
      const data = await updateToDeleteOne("cart", cart._id, _prodid);
    } else {
      // productsArray.push(product);
      // console.log(productsArray);
      // const data = insert("cart", { _profid, productsArray });
    }
    // }
    if (data && data.modifiedCount) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ data });
    }
  } catch (err) {
    // res.status(500).send({ err: JSON.stringify(err) });
    // getCart();
    res.redirect("/cart");
  }
});

app.post("/cart-product-decrease", async (req, res) => {
  const { _prodid } = req.body;
  try {
    // console.log(_id);
    console.log(_prodid);
    const product = await findOne("products", { _id: ObjectId(_prodid) });
    const cart = await findOne("cart", {});
    console.log(cart);
    // console.log(product);
    productsArray = [];
    // const cart = await findOne("cart", {})
    if (cart) {
      // bla = _id;
      // console.log(bla);
      console.log(product._id);
      // cart.productsArray.map(async (productExist) => {
      // console.log("product id is : ", productExist._id);
      // if (_id == productExist._id) {
      // product._id = new ObjectId();
      // if (bla == product._id) {
      cart.productsArray.map(async (cartProd) => {
        if (_prodid == cartProd._id) {
          if (cartProd.cartQuant == 1) {
            const data = await updateToDeleteOne("cart", cart._id, _prodid);
          } else {
            cartProd.cartQuant -= 1;
            const data = await updateOne("cart", cart._id, cart);
          }
        }
      });
      // product.cartQuant += 1;
      // }
      // product.cartCount++;
      // const data = insert("cart", productsArray);
      // });
    } else {
      // product.cartQuant = 1;
      // productsArray.push(product);
      console.log("cart not found");
      // const data = insert("cart", { _profid, productsArray });
    }
    const data = await updateOne("cart", cart._id, cart);
    // }
    if (data && data.modifiedCount) {
      // res.status(200).send({ data });
      res.redirect("/cart");
    } else {
      res.redirect("/cart");
      // res.status(500).send({ data });
    }
  } catch (err) {
    res.status(500).send({ err });
    // getCart();
    // res.redirect("/cart");
    // res.render("cart", { error: JSON.stringify(err) });
  }
});

app.post("/cart-product-increase", async (req, res) => {
  const { _prodid } = req.body;
  try {
    // console.log(_id);
    console.log(_prodid);
    const product = await findOne("products", { _id: ObjectId(_prodid) });
    const cart = await findOne("cart", {});
    console.log(cart);
    // console.log(product);
    productsArray = [];
    // const cart = await findOne("cart", {})
    if (cart) {
      // bla = _id;
      // console.log(bla);
      console.log(product._id);
      // cart.productsArray.map(async (productExist) => {
      // console.log("product id is : ", productExist._id);
      // if (_id == productExist._id) {
      // product._id = new ObjectId();
      // if (bla == product._id) {
      cart.productsArray.map(async (cartProd) => {
        if (_prodid == cartProd._id) {
          // if (cartProd.cartQuant == 1) {
          //   const data = await updateToDeleteOne("cart", cart._id, _prodid);
          // } else {
          cartProd.cartQuant += 1;
          const data = await updateOne("cart", cart._id, cart);
        }
        // }
      });
      // product.cartQuant += 1;
      // }
      // product.cartCount++;
      // const data = insert("cart", productsArray);
      // });
    } else {
      // product.cartQuant = 1;
      // productsArray.push(product);
      console.log("cart not found");
      // const data = insert("cart", { _profid, productsArray });
    }
    const data = await updateOne("cart", cart._id, cart);
    // }
    if (data && data.modifiedCount) {
      res.redirect("/cart");
      // res.status(200).send({ data });
    } else {
      res.redirect("/cart");
      // res.status(500).send({ data });
    }
  } catch (err) {
    res.status(500).send({ err });
    // res.redirect("/cart");
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

app.post("/newaddress", async (req, res) => {
  const { _id, ...address } = req.body;
  try {
    const profile = await findOne("profile", { _id: new ObjectId(_id) });
    if (profile) {
      address.id = new ObjectId();
      profile.addresses.push(address);
      const data = await updateOne("profile", _id, profile);
      if (data && data.modifiedCount) {
        res.redirect("/profile");
      } else {
        res.status(200).render("profile", { error: JSON.stringify(data) });
      }
    }
  } catch (err) {
    res.status(200).render("profile", { error: JSON.stringify(err) });
  }
});

app.post("/address", async (req, res) => {
  const { _id, addressId, ...newAddress } = req.body;
  try {
    const profile = await findOne("profile", { _id: new ObjectId(_id) });
    if (profile) {
      const oldAddress = profile.addresses.find((add) => {
        return new ObjectId(addressId).equals(add.id);
      });
      oldAddress.line1 = newAddress.line1;
      oldAddress.city = newAddress.city;
      oldAddress.postcode = newAddress.postcode;
      oldAddress.country = newAddress.country;

      const data = await updateOne("profile", _id, profile);
      if (data && data.modifiedCount) {
        res.redirect("/profile");
      } else {
        console.log("if else");
        res.status(200).render("profile", { error: JSON.stringify(data) });
      }
    }
  } catch (err) {
    console.log("lol");
    res.status(200).render("profile", { error: JSON.stringify(err) });
  }
});

// Start the express application
app.listen(1234, function () {
  console.log(`Server is running @ http://localhost:1234`);
});

# NodeJs - Training

## Cart Assignment
### Using nodeJs, ExpressJs, MongoDB, pug

### NPM Packages used: "npm install"
    - nodemon
    - mongodb
    - pug
    - express

A Basic Assignment on a Shopping cart for a user. (Displaying cart-Items, CRUD Operations in mongoDB).

MongoDB runs on default **"localhost:27017"**
To see the items and make the app functionable by default add **Products** and **Profile** objects to the db.

For **Products** objects refer to ths link [FakeStore-api](https://fakestoreapi.com/products)

For **Profile** follow the below structure:

### Profile
    {
      name: String
      avatar: String
      addresses: Array
      [
        {
          line1: String
          city: String
          postcode: Int
          country: String
        }
      ]
    }

Don't forget to do **"npm install"**


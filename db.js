const { MongoClient } = require("mongodb");
// Connection string - to connect to the mongo database
const URI = "mongodb://localhost:27017";
// Create a new client using the connection string
const client = new MongoClient(URI);

async function insert(collectionName, data) {
  try {
    // Connect to mongo db server
    await client.connect();
    // Get the database reference
    const db = client.db("ecom");
    // Get the collection reference
    const collection = db.collection(collectionName);
    // Insert one record
    return await collection.insertOne(data);
  } catch (err) {
    console.error(`Error while inserting data. ${err}`);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function insertMany(collectionName, data) {
  try {
    // Connect to mongo db server
    await client.connect();
    // Get the database reference
    const db = client.db("ecom");
    // Get the collection reference
    const collection = db.collection(collectionName);
    // Insert all records
    return await collection.insertMany(data);
  } catch (err) {
    console.error(`Error while inserting data. ${err}`);
  } finally {
    // Close the connection
    await client.close();
  }
}

async function find(collectionName, query) {
  try {
    // Connect to mongo db server
    await client.connect();
    // Get the database reference
    const db = client.db("ecom");
    // Get the collection reference
    const collection = db.collection(collectionName);
    // Find documents using query and convert to array
    return await collection.find(query).toArray();
  } catch (err) {
    console.error(`Error while querying data. ${err}`);
  } finally {
    // Close the connection
    await client.close();
  }
}

module.exports = {
  insert,
  insertMany,
  find,
};

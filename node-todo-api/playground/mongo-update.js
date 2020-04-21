const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server.");
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  db.collection("Users")
    .findOneAndUpdate(
      { _id: new ObjectID("5e9e687587ccc659cfcb8022") },
      { $set: { name: "Ora Martindale" }, $inc: { age: 1 } },
      { returnOriginal: false }
    )
    .then(console.log);

  client.close();
});

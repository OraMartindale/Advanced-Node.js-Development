const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server.");
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  db.collection("Todos")
    .findOneAndUpdate(
      { _id: new ObjectID("5e9e41a487ccc659cfcb7b0d") },
      { $set: { completed: true } },
      { returnOriginal: false }
    )
    .then(console.log);

  client.close();
});

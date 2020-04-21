const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server.");
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  db.collection("Users").deleteMany({ name: "Ora Martindale" });
  db.collection("Users").findOneAndDelete({
    _id: new ObjectID("5e9e688187ccc659cfcb8028")
  });

  client.close();
});

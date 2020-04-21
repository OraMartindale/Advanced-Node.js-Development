// const MongoClient = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server.");
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  //   insertTodo(db);
  //   insertUser(db);
  client.close();
});

const insertTodo = db => {
  db.collection("Todos").insertOne(
    {
      text: "Something to do",
      completed: false
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert todo", err);
      }

      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );
};

const insertUser = db => {
  db.collection("Users").insertOne(
    {
      name: "Ora Martindale",
      age: 44,
      location: "KC"
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert todo", err);
      }

      console.log(result.ops[0]._id.getTimestamp());
    }
  );
};

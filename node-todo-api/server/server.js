const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

const Todo = mongoose.model("Todos", {
  text: { type: String, required: true, minlength: 1, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null }
});

const User = mongoose.model("Users", {
  email: { type: String, required: true, minlength: 1, trim: true }
});

var newUser = new User({ email: "ora@martindale.org" });

newUser.save().then(console.log, console.error);

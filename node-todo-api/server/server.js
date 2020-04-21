const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

const Todo = mongoose.model("Todos", {
  text: { type: String, required: true, minlength: 1, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Number, default: null }
});

var otherTodo = new Todo({ text: "Edit this video" });

otherTodo.save().then(console.log, console.error);

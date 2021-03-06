const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("../models/todo");

const firstTestId = new ObjectID();
const secondTestId = new ObjectID();
const todos = [
  { _id: firstTestId, text: "First test todo" },
  {
    _id: secondTestId,
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST to /todos", () => {
  it("should create a new todo in mongodb", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${firstTestId.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe("First test todo");
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    let badId = new ObjectID();
    request(app)
      .get(`/todos/${badId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for non-object ids", done => {
    request(app)
      .get("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    request(app)
      .delete(`/todos/${secondTestId.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe("Second test todo");
      })
      .end(done);
  });

  it("should return 404 if todo not found", done => {
    let badId = new ObjectID();
    request(app)
      .delete(`/todos/${badId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if object id is invalid", done => {
    request(app)
      .delete("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("PUT /todos/:id", () => {
  it("should update the todo", done => {
    let text = "This should be the new text";
    request(app)
      .put(`/todos/${firstTestId.toHexString()}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBeTruthy();
        expect(res.body.todo.completedAt).not.toBeNaN();
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
  });

  it("should clear completedAt when todo is not completed", done => {
    request(app)
      .put(`/todos/${secondTestId.toHexString()}`)
      .send({
        completed: false
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBeNull();
        expect(res.body.todo.text).toBe("Second test todo");
      })
      .end(done);
  });
});

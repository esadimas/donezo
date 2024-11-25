const Todo = require("../models/todoModel");

const getAllTodo = async (req, res) => {
  try {
    const user = req.user.id
    const todos = await Todo.find({userId: user});

    if (!todos || todos.length === 0) {
      return res.status(404).json({
        message: "No To-Do items found.",
        data: [],
      });
    }

    res.status(200).json({ message: "Succes get all todo", data: todos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // untuk validasi apakah input tanggal valid dan tidak berada di masa lalu
    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ error: "Due date cannot be in the past" });
    }

    const todo = await Todo.create({
      userId: req.user.id,
      title,
      dueDate: new Date(dueDate),
      description,
    });

    res.status(201).json(todo);
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstErrorMessage = Object.values(error.errors)[0].message;
      return res.status(400).send({error: firstErrorMessage});
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllTodo, createTodo };

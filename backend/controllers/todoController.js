const Todo = require("../models/todoModel");

const getAllTodo = async (req, res) => {
  try {
    const user = req.user.id;
    const todos = await Todo.find({ userId: user });

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
      return res.status(400).send({ error: firstErrorMessage });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  const validStatuses = ["pending", "progress", "done"];
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const userId = req.user.id;

    // Validasi ID (misalnya, untuk MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status value. Allowed: ${validStatuses.join(", ")}`,
      });
    }

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this Todo" });
    }

    // Filter dan data pembaruan
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
      ...(typeof status !== "undefined" && { status }),
    };

    const result = await Todo.updateOne({ _id: id }, { $set: updateData });

    // Periksa apakah ada dokumen yang diperbarui
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Validasi ID (misalnya, untuk MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(401)
        .json({ message: "You are not authorized to update this Todo" });
    }

    const result = await Todo.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };

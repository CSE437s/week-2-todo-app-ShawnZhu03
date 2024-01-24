//server
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const port = 5001;

app.use(cors());
app.use(express.json());

const URI =
  "mongodb+srv://shawnzhu:1XLt8IZ9nynkKS5u@todo.ftbmprk.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoose databse connection established successfully");
});

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});

//models
const TODO = require("./todomodel.js");

//routes

app.get("/TODOS", async (req, res) => {
  try {
    const TODOS = await TODO.find();
    res.json(TODOS);
  } catch (error) {
    res.status(500).json({ message: "Error fetching folders", error: error });
  }
});

app.post("/Add", async (req, res) => {
  try {
    const { name, task, date } = req.body;
    const newTODO = new TODO({
      name: name,
      task: task,
      date: date,
    });
    await newTODO.save();
    res.status(201).json({ message: "TODO created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating TODO" });
    console.log("create TODO failed");
  }
});

app.post("/Done", async (req, res) => {
  try {
    const { _id, done } = req.body;
    const updatedTodo = await TODO.findOneAndUpdate(
        { _id: _id },
        { $set: { done: done } },
        { new: true } 
      );

    res.status(201).json({ message: "TODO updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating TODO" });
    console.log("update TODO failed");
  }
});

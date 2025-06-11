const express = require("express");
const Task = require("../models/Task"); 
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/tasks", authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.post("/tasks", authenticate, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.json(task);
});

router.put("/tasks/:id", authenticate, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/tasks/:id", authenticate, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;

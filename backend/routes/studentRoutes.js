
const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID"
    });
  }
});

// POST add student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Student added successfully",
      student
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

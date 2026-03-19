const express = require("express");
const router = express.Router();

const {
  createExam,
  getExams
} = require("../controllers/examController");

router.post("/create", createExam);
router.get("/all", getExams);

module.exports = router;
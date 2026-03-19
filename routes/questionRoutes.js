const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions
} = require("../controllers/questionController");

router.post("/add", addQuestion);
router.get("/:exam_id", getQuestions);

module.exports = router;
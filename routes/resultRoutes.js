const express = require("express");
const router = express.Router();
const { submitExam, getResult } = require("../controllers/resultController");

router.post("/submit", submitExam);
router.get("/:student_id/:exam_id", getResult);

module.exports = router;
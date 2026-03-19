const db = require("../config/db");

// Create Exam
exports.createExam = (req, res) => {
  const { exam_name, duration } = req.body;

  const sql = "INSERT INTO exams (exam_name, duration) VALUES (?, ?)";

  db.query(sql, [exam_name, duration], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Exam created successfully",
      exam_id: result.insertId
    });
  });
};

// Get All Exams
exports.getExams = (req, res) => {
  const sql = "SELECT * FROM exams";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};
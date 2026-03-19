const db = require("../config/db");

// Add Question
exports.addQuestion = (req, res) => {
  const {
    exam_id,
    question_text,
    optionA,
    optionB,
    optionC,
    optionD,
    correct_answer
  } = req.body;

  const sql = `
    INSERT INTO questions 
    (exam_id, question_text, optionA, optionB, optionC, optionD, correct_answer) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [exam_id, question_text, optionA, optionB, optionC, optionD, correct_answer],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Question added successfully"
      });
    }
  );
};

// Get Questions by Exam
exports.getQuestions = (req, res) => {
  const exam_id = req.params.exam_id;

  const sql = "SELECT * FROM questions WHERE exam_id = ?";

  db.query(sql, [exam_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};
const db = require('../config/db')

// Submit Exam & Calculate Result
exports.submitExam = (req, res) => {
  const { student_id, exam_id, answers } = req.body

  console.log('ALL ANSWERS:', answers)

  const sql = 'SELECT * FROM questions WHERE exam_id = ?'
  console.log('BODY:', req.body)
  db.query(sql, [exam_id], (err, questions) => {
    if (err) return res.status(500).json(err)

    let score = 0

    questions.forEach((question) => {
      const studentAnswer = answers?.[question.question_id]

      if (
        studentAnswer &&
        question.correct_answer &&
        studentAnswer.trim().toLowerCase() ===
          question.correct_answer.trim().toLowerCase()
      ) {
        score++
      }
    })

    const resultSql = `
INSERT INTO results (student_id, exam_id, score)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE score = ?
`

    db.query(resultSql, [student_id, exam_id, score, score], (err, result) => {
      if (err) return res.status(500).json(err)

      res.json({
        message: 'Exam submitted successfully',
        score: score,
        total: questions.length,
      })
    })
  })
}

exports.getResult = (req, res) => {
  const { student_id, exam_id } = req.params

  console.log('PARAMS:', student_id, exam_id)

  const sql = `
SELECT r.score, COUNT(q.question_id) as total
FROM results r
JOIN questions q ON r.exam_id = q.exam_id
WHERE r.student_id=? AND r.exam_id=?
GROUP BY r.score
`

  db.query(sql, [student_id, exam_id], (err, result) => {
    if (err) {
      return res.status(500).json(err)
    }

    res.json(result[0] || {})
  })
}

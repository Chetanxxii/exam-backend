const db = require('../config/db')
const bcrypt = require('bcryptjs')

// Student Register
exports.registerStudent = (req, res) => {
  const { name, email, password } = req.body

  const hashedPassword = bcrypt.hashSync(password, 10)

  const sql = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)'

  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json({ message: 'Student Registered Successfully' })
  })
}

// Student Login
exports.loginStudent = (req, res) => {
  const { email, password } = req.body

  const sql = 'SELECT * FROM students WHERE email = ?'

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err)

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const validPassword = bcrypt.compareSync(password, result[0].password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({
      message: 'Login Successful',
      user: {
        id: result[0].id,
        role: result[0]
      },
    })
  })
}

// Admin Login
exports.loginAdmin = (req, res) => {
  const { username, password } = req.body

  const sql = 'SELECT * FROM admins WHERE username = ?'

  db.query(sql, [username], (err, result) => {
    if (err) return res.status(500).json(err)

    if (result.length === 0) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    const validPassword = bcrypt.compareSync(password, result[0].password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({ message: 'Admin Login Successful' })
  })
}

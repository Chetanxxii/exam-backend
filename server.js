const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./config/db");


const app = express();

const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");


app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/result", resultRoutes);

app.get("/", (req, res) => {
  res.send("Online Examination System API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
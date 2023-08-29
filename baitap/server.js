const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// BAI2
app.get("/", (req, res) => {
  res.send("<h1>đây là home page</h1>");
});

app.get("/ask", (req, res) => {
  res.send("<h1>yêu cầu đăng nhập </h1>");
});

app.get("/detail", (req, res) => {
  res.send("<h1>Login</h1>");
});

// app.get("/*", (req, res) => {
//     res.send("<h1> PAGE NOT FOUND</h1>");
// });

// BAI 3
// GET ALL
app.get("/api/v1/questions", (req, res) => {
  try {
    let questions = JSON.parse(fs.readFileSync("./data/questions.json"));
    res.json({
      questions: questions,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// GET ONE
app.get("/api/v1/questions/:id", (req, res) => {
  // logic
  let { id } = req.params;
  try {
    let questions = JSON.parse(fs.readFileSync("./data/questions.json"));
    let ques = questions.find((e, i) => e.id === Number(id));
    if (!ques) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json({
        question: ques,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// POST
app.post("/api/v1/questions", (req, res) => {
  let { content, like, dislike } = req.body;
  let ques = {
    id: Math.floor(Math.random() * 1000000000000000),
    content,
    like,
    dislike,
  };
  try {
    let questions = JSON.parse(fs.readFileSync("./data/questions.json"));
    questions.push(ques);
    fs.writeFileSync("./data/questions.json", JSON.stringify(questions));
    res.json({
      message: "Create user successfully",
      ques,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// PUT
app.put("/api/v1/questions/:id", (req, res) => {
  // logic
  let { id } = req.params;
  let { content, like, dislike } = req.body;
  try {
    let questions = JSON.parse(fs.readFileSync("./data/questions.json"));
    let quesIndex = questions.findIndex((e, i) => e.id === Number(id));

    if (quesIndex === -1) {
      res.json({
        message: "User not found",
      });
    } else {
      questions[quesIndex].content = content;
      questions[quesIndex].like = like;
      questions[quesIndex].dislike = dislike;

      fs.writeFileSync("./data/questions.json", JSON.stringify(questions));

      res.json({
        message: "Update user successfully",
        user: questions[userIndex],
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
// DELETE
app.delete("/api/v1/questions/:id", (req, res) => {
  let { id } = req.params;
  let questions = JSON.parse(fs.readFileSync("./data/questions.json"));
  let updatedQues = questions.filter((user, index) => user.id != id);
  fs.writeFileSync("./data/questions.json", JSON.stringify(updatedQues));
  res.json({
    message: "Delete successfully",
    updateQuestion: updatedQues,
  });
});

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});

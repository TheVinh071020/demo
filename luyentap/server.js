const express = require("express");
const port = 3000;
const app = express();

const user = {
  userName: "vinh",
  password: "123",
};
const reqUser = {
  userName: "vinh",
  password: "1231",
};

const middleWareCheckLogin = (req, res, next) => {
  // logic code
  if (reqUser.userName == user.userName && reqUser.password == user.password) {
    console.log("login success");
    next();
  } else {
    console.log("login false");
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});
app.get("/payment", middleWareCheckLogin, (req, res) => {
  res.send("<h1>Yêu cầu đăng nhập</h1>");
});
app.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

app.listen(port, () => {
  console.log("listening on port:", port);
});

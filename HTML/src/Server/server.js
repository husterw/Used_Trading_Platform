const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// 使用 cors 中间件来解决跨域问题
app.use(cors());

// 使用 express 中间件来解析 application/x-www-form-urlencoded 格式的数据
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.post("/submit", (req, res) => {
  // 解析后的表单数据在 req.body 中
  const userId = req.body.userId;
  const password = req.body.password;

  let map = new Map();
  map.set("U202200000", "123456");
  if (map.has(userId) && map.get(userId) === password) {
    res.json({
      status: "success",
      message: "Login successful",
    });
  } else {
    res.json({
      status: "fail",
      message: "id or password is wrong",
    });
  }

  return;
});

app.post("/get-ver-code", (req, res) => {
  const email = req.body.email;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verifyCode = "";
  for (let i = 0; i < 6; i++) {
    verifyCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  if (email) {
    res.json({
      status: "success",
      message: verifyCode,
    });
  } else {
    res.json({
      status: "fail",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

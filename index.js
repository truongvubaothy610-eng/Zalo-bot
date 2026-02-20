const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Zalo Bot đang chạy 😎");
});

// Webhook nhận dữ liệu từ Zalo
app.post("/webhook", async (req, res) => {
  console.log("DATA NHẬN:", req.body);

  // Ví dụ: nếu ai gửi chữ "ping" thì bot trả lời "pong"
  if (req.body.message && req.body.message.text === "ping") {
    console.log("Có người gửi ping 👀");
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Bot chạy cổng " + PORT);
});

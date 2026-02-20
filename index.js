const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const ACCESS_TOKEN = "DÁN_ACCESS_TOKEN_OA_VÀO_ĐÂY";

app.get("/", (req, res) => {
  res.send("Zalo Bot đang chạy 😡");
});

// Webhook Zalo OA
app.post("/webhook", async (req, res) => {
  console.log("DATA NHẬN:", req.body);

  try {
    const event = req.body;

    // Kiểm tra có phải event người dùng gửi tin nhắn không
    if (event.event_name === "user_send_text") {
      const senderId = event.sender.id;
      const userMessage = event.message.text;

      if (userMessage.toLowerCase() === "ping") {
        await axios.post(
          "https://openapi.zalo.me/v3.0/oa/message/cs", 
          {
            recipient: {
              user_id: senderId,
            },
            message: {
              text: "Ponggg 🏓 Zalo bot chạy rồi ccho 😡",
            },
          },
          {
            headers: {
              access_token: ACCESS_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Lỗi:", error.response?.data || error.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server chạy cổng", PORT);
});

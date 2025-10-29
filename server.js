const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve frontend files (index.html, etc.)

// 🔐 Mailtrap SMTP configuration
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",  // Mailtrap's host
  port: 2525,
  auth: {
    user: "e4e2d8c2b4b19d",  // replace with your Mailtrap username
    pass: "0a90d2456caefa",  // replace with your Mailtrap password
  },
});

// 📨 Route to send emails
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: '"Fahim Mail" <no-reply@fahimmail.com>', // sender name & email
      to,
      subject,
      text: message,
    });

    console.log(`✅ Email sent successfully to ${to}`);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send email." });
  }
});

// ⚙️ Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`📩 Server running at http://localhost:${PORT}`));

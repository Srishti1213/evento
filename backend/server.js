const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());


// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Server working 🚀");
});


// 🔐 SIGNUP API
app.post("/signUp", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO Users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, email, hashedPassword, role || "user"], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Signup successful ✅" });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔑 LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM Users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({ token });
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
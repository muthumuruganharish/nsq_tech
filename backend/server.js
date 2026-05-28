const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");

const login=require("./Router/Login_route")
const signup=require("./Router/Signup_route")

const dashboard =require("./Router/Dashbard_route")

const app = express()

app.use(cors())
app.use(express.json())


app.use("/api", login)
app.use("/api",signup)
app.use("/api", dashboard);

app.get("/", (req, res) => {
  res.send("Server is running")
});

const PORT = process.env.PORT || 5000


mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
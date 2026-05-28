const express = require("express");
const router = express.Router();


const { login } = require("../Controller/LoginController");

router.post("/login", login);
module.exports = router;
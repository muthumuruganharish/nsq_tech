const express = require("express");

const router = express.Router();

const {getRecords} = require("../Controller/DashboardController");

router.get("/records", getRecords);

module.exports = router;
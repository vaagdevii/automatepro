const express = require("express");

const {
  createLead,
  getLeads,
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", createLead);

router.get("/", getLeads);

module.exports = router;
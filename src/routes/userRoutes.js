const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");

// Example route
router.get("/", getUsers);

module.exports = router;

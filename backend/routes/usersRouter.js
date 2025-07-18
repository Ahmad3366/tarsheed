const router = require("express").Router();
const { loginAdmin, createAdmin } = require("../controllers/usersController");

// Register route
router.post("/register", createAdmin);
// Login route
router.post("/login", loginAdmin);

module.exports = router;

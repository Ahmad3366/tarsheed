const router = require("express").Router();
const { loginAdmin, createAdmin, logoutAdmin } = require("../controllers/usersController");

// Register route
router.post("/register", createAdmin);
// Login route
router.post("/login", loginAdmin);
// Logout route
router.post("/logout", logoutAdmin);

module.exports = router;

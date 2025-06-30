const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { loginAdmin } = require('../controllers/usersController');

// Login route
router.post('/login', loginAdmin);

module.exports = router;
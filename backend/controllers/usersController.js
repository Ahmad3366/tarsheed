const Admin = require("../models/Admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // This method creates a new admin user (only for super admins or Developers)
  createAdmin: async (req, res) => {
    try {
      var { fullName, email, username, password } = req.body;

      console.log("Creating admin with data:", {
        fullName,
        email,
        username,
        password: password ? "******" : undefined, // Mask password in logs
      });

      // Validation
      if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (!/^[a-z]+@tarsheed\.gov\.sd$/.test(email)) {
        return res.status(400).json({
          message:
            "Email must be in format: name@tarsheed.gov.sd (lowercase only)",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters long",
        });
      }

      // Check for existing admin
      const [existingEmailAdmin, existingUsernameAdmin] = await Promise.all([
        Admin.findOne({ email }),
        Admin.findOne({ username }),
      ]);

      if (existingEmailAdmin) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if (existingUsernameAdmin) {
        return res.status(409).json({ message: "Username already exists" });
      }

      let hashedPassword;
      try {
        hashedPassword = await bcryptjs.hash(password, 10);
      } catch (hashErr) {
        console.error("bcrypt error:", hashErr);
        return res.status(500).json({ message: "Error hashing password" });
      }

      const newAdmin = new Admin({
        fullName,
        email,
        username,
        password: hashedPassword,
      });
      await newAdmin.save();

      res
        .status(201)
        .json({ message: "Admin created successfully", adminId: newAdmin._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const admin = await Admin.findOne({ email }).select("+password");
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcryptjs.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          adminId: admin._id,
          username: admin.username,
          role: "admin", // Consider adding role for authorization
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        adminId: admin._id,
        // Optionally return basic admin info (without sensitive data)
        admin: {
          fullName: admin.fullName,
          email: admin.email,
          username: admin.username,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({
        message: "Login failed",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },

  logoutAdmin: (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.json({ message: "Logout successful" });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ message: "Logout failed" });
    }
  },
};

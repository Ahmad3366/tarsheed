const Report = require("../models/Report");

module.exports = {
  // Get all reports
  getAllReports: async (req, res) => {
    try {
      const reports = await Report.find().sort({ createdAt: -1 });
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
  // Get one report by ID

  getAllReports: async (req, res) => {
    try {
      const reports = await Report.find().sort({ createdAt: -1 });
      res.json(reports);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getReportById: async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) return res.status(404).json({ error: "Report not found" });
      res.json(report);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
  // Create a new report

  createReport: async (req, res) => {
    try {
      const { reporterName, reporterPhone, title, state, description, imageFile, userId } = req.body;

      if (!reporterName || !reporterPhone || !title || !state || !imageFile) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const report = await Report.create({
        reporterName,
        reporterPhone,
        title,
        state,
        description,
        imageFile,
        userId
      });
      res.status(201).json(report);
    } catch (err) {
      console.log(err);

      res.status(400).json({ error: "somthing went wrong" });
    }
  },
  // Delete a report by ID
  deleteReport: async (req, res) => {
    try {
      const report = await Report.findByIdAndDelete(req.params.id);
      if (!report) return res.status(404).json({ error: "Report not found" });
      res.json({ message: "Report deleted" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
  // Update a report by ID
  updateReport: async (req, res) => {
    try {
      const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!report) return res.status(404).json({ error: "Report s not found" });
      res.json(report);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

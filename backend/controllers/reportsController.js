const Report = require("../models/Report");

// Get all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get one report by ID
exports.getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Create a new report
exports.createReport = async (req, res) => {
	try {
		const { title, state, description, imageFile, userId } = req.body;
		const report = await Report.create({ title, state, description, imageFile, userId });
		res.status(201).json(report);
	} catch (err) {
		console.log(err);
		
		res.status(400).json({ error: "somthing went wrong" });
		
	}
};

// Delete a report by ID
exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });
        res.json({ message: "Report deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
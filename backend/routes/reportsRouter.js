const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

// Get all reports
router.get('/', reportsController.getAllReports);

// Create a new report
router.post('/', reportsController.createReport);

// Get one report by ID
router.get('/:id', reportsController.getReportById);

// Update a report by ID
router.patch('/:id', reportsController.updateReport);

// Delete a report by ID
router.delete('/:id', reportsController.deleteReport);

module.exports = router;
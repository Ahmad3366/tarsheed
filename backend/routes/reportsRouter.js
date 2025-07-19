const router = require('express').Router();
const { getAllReports, createReport, getReportById, updateReport, deleteReport } = require('../controllers/reportsController');

// Get all reports
router.get('/', getAllReports);

// Create a new report
router.post('/', createReport);

// Get one report by ID
router.get('/:id', getReportById);

// Update a report by ID
router.patch('/:id', updateReport);

// Delete a report by ID
router.delete('/:id', deleteReport);

module.exports = router;
const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
	
})

router.post('/', (req, res) => {
	console.log(req.body);

	res.status(200).json(req.body)
})

router.get('/:id', (req, res) => {})

module.exports = router
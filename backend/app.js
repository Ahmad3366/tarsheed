require('dotenv').config()

const express = require('express');
// const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const reportsRouter = require('./routes/reportsRouter')

app.get('/', (req, res) => {
	console.log(req.url);
	res.json({message: 'hi'})
	
})

// Middlewares
app.use(express.json())
app.use(cors({
    origin: '*'
}))

// routes
app.use('/api/reports', reportsRouter)

app.listen(3000, () => {
	console.log('done!');
})
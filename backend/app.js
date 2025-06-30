require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const reportsRouter = require('./routes/reportsRouter')

// Middlewares
app.use(express.json({ limit: '4mb' }))
app.use(cors({
    origin: '*'
}))

app.get('/helloworld', (req, res) => {
	res.send('helloworld')
})

// routes
app.use('/api/reports', reportsRouter)
const mongoUri = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;

mongoose.connect(mongoUri)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} and connected to db`);
    })
}) 
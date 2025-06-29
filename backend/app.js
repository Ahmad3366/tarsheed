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

mongoose.connect(process.env.MONGO_URI_DEV)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} and connected to db`);
    })
}) 
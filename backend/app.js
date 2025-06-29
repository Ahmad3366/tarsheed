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

<<<<<<< HEAD
app.get('/helloworld', (req, res) => {
	res.send('helloworld')
})

// routes
app.use('/api/reports', reportsRouter)

mongoose.connect(process.env.MONGO_URI_DEV)
=======
// routes
app.use('/api/reports', reportsRouter)

mongoose.connect(process.env.MONGO_URI)
>>>>>>> caf765cfb660bbc85fdc82840be98c63920ea65c
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} and connected to db`);
    })
}) 
const http = require("http");
require('dotenv').config()
const {connectDB} = require('./config/connectDB')
const express = require('express')
const app = express()
const cors = require('cors')
const {errorHandler} = require('./error/handleError')
app.use(cors()) // use send req from back to front end
app.use(express.json())
connectDB()
//import route
const authRoute = require('./routes/authRoute')


//mount the route
app.use('/api/v1/auth', authRoute)

const server = http.createServer(app);
const port = process.env.PORT || 5000;

//Route not exist
app.all('*', (req, res, next) => {
    const err = new Error('The route can not be found')
    err.statusCode = 404
    next(err)
})
app.use(errorHandler)

server.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
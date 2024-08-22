const express = require('express');
const color = require('colors')
const morgan = require('morgan')
const cors = require('cors');
const connectDB = require('./db/connectDB');
const authroute = require('./routes/Auth.route');
const Collagerouter = require('./routes/Collage.route');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cloudinary = require('cloudinary');
const Studentrouter = require('./routes/Student.route');
const { createServer } = require('http')
const { Server } = require('socket.io')
require('dotenv').config()
const app = express()

const server = createServer(app)

const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    //middlewere
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
    //connectDb
connectDB()
    //routes

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.get('/', (req, res) => {
    res.send("wellcome to Bput result api");
})

app.use('/api/v1/auth', authroute)
app.use('/api/v1/collage', Collagerouter)
app.use('/api/v1/student', Studentrouter)
app.use(errorMiddleware)


///socket io setup
io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('sendData', (data) => {
        io.emit("getdata", data)
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

server.listen(process.env.PORT, () => {
    console.log(`server is starting on port http://localhost:${process.env.PORT}`.bgGreen)
})
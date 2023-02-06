const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes.js')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Execute if client connects 
io.on('connection', socket => {
  console.log('new socket connection for the user');
});

// Connection to mongoDB database
mongoose.connect('mongodb+srv://murat96:123456murka@cluster0.okt8nyq.mongodb.net/w2023_comp3133?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(userRouter)

app.get('/', (req, res) => {
  res.redirect('/signup')
})

// Frontend redirect
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


server.listen(3005, () => console.log("The server is running on port 3005"))
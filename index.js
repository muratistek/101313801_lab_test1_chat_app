const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes.js')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

function getFormattedTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let am_pm = 'AM';
  if (hours >= 12) {
    am_pm = 'PM';
    hours = hours % 12 || 12;
  }

  return `  ${hours}:${minutes}:${seconds} ${am_pm}`;
}

function returnUpdatedMessage(username, text) {
  return {
    username,
    text,
    createdAt: getFormattedTime()
  }
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Execute if client connects 
io.on('connection', socket => {
  socket.emit('message', returnUpdatedMessage('Murat the creator', 'Welcome to my chat app'))
  socket.broadcast.emit('message', returnUpdatedMessage('Murat the creator', 'User joined the chat'))

  // Execute if client disconnected
  socket.on('disconnect', () => {
    io.emit('message', returnUpdatedMessage('Murat the creator', 'User has left'))
  })

  // Check userChatMessage from server
  socket.on('userChatMessage', (msg) => {
    io.emit('message', returnUpdatedMessage('USER', msg));
  })
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


server.listen(3005, () => console.log("The server is running on port 3005"))
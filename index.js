const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/UserRoutes.js')

const app = express()
// app.use(express.json())

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


app.listen(3005, () => console.log("The server is running on port 3005"))
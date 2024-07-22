const express = require('express');
const cors = require('cors');
const http = require('http')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// Connect to the database
connectDB;

// Middleware
app.use(express.json({ extended: false }));

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/',(req, res) => {
  res.send("welcome node server");
})

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('message', (data) => {
    console.log("Message received:", data);
  });
  socket.on('disconnect', () =>{
    console.log("User disconnected");
  })
})

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/app', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

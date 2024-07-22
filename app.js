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
  res.send("welcome to node server");
})

// io.use((socket, next) => {
//   const token = socket.handshake.headers['authorization'];
//   if (token) {
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) return next(new Error('Authentication error'));
//       socket.user = decoded;
//       next();
//     });
//   } else {
//     next(new Error('Authentication error'));
//   }
// });

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for app block events
  socket.on('app-blocked', (data) => {
    console.log('Received block-app event:', data);
    // Broadcast to all clients or a specific room
    io.emit('app-blocked', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/app', require('./routes/userRoutes'));
app.use('/api/appUsage', require('./routes/appRoutes'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const http = require('http')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
// import {saveApp} from './models/appModel'
dotenv.config();

const app = express();
const server = http.createServer(app);
// Connect to the database
connectDB;

// Middleware
app.use(express.json({ extended: false }));


// Custom CORS middleware  

// CORS options for Express API  
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true,
};

// Use CORS middleware  
app.use(cors(corsOptions));

// Initialize Socket.IO with CORS options  
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


app.get('/', (req, res) => {
  res.send("welcome to node server");
})


/* The code snippet `io.use((socket, next) => { ... })` is setting up middleware for Socket.IO
connections. */
// io.use((socket, next) => {  
//   // Get the 'Authorization' header  
//   const authHeader = socket._opts.extraHeaders.Authorization;  

//   // Ensure the header starts with "Bearer "  
//   if (authHeader && authHeader.startsWith('Bearer ')) {  
//     // Extract token from the header  
//     const token = authHeader.split(' ')[1];  

//     // Verify the token  
//     jwt.verify(token, secretKey, (err, decoded) => {  
//       if (err) return next(new Error('Authentication error'));  

//       // Save user information in the socket object for later use  
//       socket.user = decoded;  
//       next();  
//     });  
//   } else {  
//     next(new Error('Authentication error'));  
//   }  
// });  

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('connection-success', { message: 'Successfully connected to server' });
  socket.on('userinfo', (data) => {
    const token = data.token.split('.')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.emit('userinfo', decoded.user)
  })
  socket.on('block-app', (data) => {
    socket.emit('block-app-response', { status: 'success', message: 'App blocking information saved successfully' });
    socket.emit('app-blocked', {
      data
    });
  });
  socket.on("send-child-data", (data) => {
    // saveApp(data, (err,result) => {
    //   if(err) {
    //     socket.emit('receive-child-data', {status: 'error', message: 'Error saving app'});
    //   } else {
    socket.emit('receive-child-data', { status: 'success', message: 'App blocking info' });
    // }
    // })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/app', require('./routes/userRoutes'));
// app.use('/api/appUsage', require('./routes/appRoutes'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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

io.use((socket, next) => {
  const token = socket.handshake.headers['authorization'];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('connection-success', { message: 'Successfully connected to server' });

  socket.on('block-app', (data) => {
    const { child_id, avatar, package_name, app_usage_time, state, app_name } = data;
    const created_at = Date.now();
    const updated_at = Date.now();
    const query = 'INSERT INTO block_apps (child_id, app_name, state, created_at, updated_at, package_name, avatar, app_usage_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [child_id, app_name, state, created_at, updated_at, package_name, avatar, app_usage_time], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        socket.emit('block-app-response', { status: 'error', message: 'Error saving app blocking information' });
      } else {
        socket.emit('block-app-response', { status: 'success', message: 'App blocking information saved successfully' });
      }
    });
  });

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

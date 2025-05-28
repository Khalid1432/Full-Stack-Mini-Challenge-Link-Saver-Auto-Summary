const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/routes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {
    origin: ["https://full-stack-mini-challenge-link-saver-auto-summary-6u604lz44.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

const _dirname = path.resolve();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// db call
const db = require('./config/database');
db.connect();

// mount
app.use('/api/v1', routes);

// Serve frontend
app.use(express.static(path.join(_dirname, 'front-end', 'dist')));

// Fallback route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'front-end', 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

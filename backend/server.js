const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./logger-service');
const app = express();

// Express config
app.use(express.json());
app.use(logger.reqLog);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:8081',
      'http://localhost:8081'
    ],
    credentials: true
  };
  app.use(cors(corsOptions));
}

// Routes
const messagesRoutes = require('./api/messages')
app.use('/api/messages', messagesRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
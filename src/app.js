require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const studentsRouter = require('./students/students-router');
const diaryRouter = require('./diary/diary-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/students', studentsRouter);
app.use('/api/diary', diaryRouter);

const errorHandler = (error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: "Server error" } }
  } else {
    response = { message: error.message, error }
  };
  res.status(500).json(response);
};

app.get('/api/*', (req, res) => {
    res.json({ok: true});
});

app.use(errorHandler);

module.exports = app;
const express = require('express');
const path = require('path');
const DiaryService = require('./diary-service');
const { requireAuth } = require('../middleware/jwt-auth');

const diaryRouter = express.Router();
const jsonBodyParser = express.json();


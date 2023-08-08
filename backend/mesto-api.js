require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to ${DB_URL}`);
  })
  .catch((err) => console.log(err));

const app = express();

console.log(process.env.NODE_ENV);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const winston = require('winston');
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
    // new winston.transports.Console(),
  ],
  form: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    // new winston.transports.Console(),
  ],
  form: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};

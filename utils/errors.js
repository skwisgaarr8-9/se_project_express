const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  DEFAULT,
} = require('./errorCodes');

module.exports.handleError = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({
      message: `400 -- Request resulted in ${err.name}: Incorrect data`,
    });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(UNAUTHORIZED).send({
      message: `401 --- ${err.message}`,
    });
    return;
  }

  if (err.name === 'ForbiddenError') {
    res.status(FORBIDDEN).send({
      message: `403 --- ${err.message}`,
    });
    return;
  }

  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND).send({
      message: `404 -- Request resulted in ${err.name}: The item or items requested do not exist`,
    });
    return;
  }

  if (err.name === 'MongoServerError') {
    res.status(CONFLICT).send({
      message: '409 -- Email already in use',
    });
    return;
  }

  console.error(err);

  res.status(DEFAULT).send({
    message: '500 -- An error has occurred on the server',
  });
};

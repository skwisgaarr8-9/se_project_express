const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./errorCodes");

module.exports.handleError = (err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(BAD_REQUEST).send({
      message: `400 -- Request resulted in ${err.name}: Incorrect data`,
    });
    return;
  }

  if (err.name === "DocumentNotFoundError") {
    res.status(NOT_FOUND).send({
      message: `404 -- Request resulted in ${err.name}: The item or items requested do not exist`,
    });
    return;
  }
  res.status(DEFAULT).send({
    message: "500 -- An error has occurred on the server",
  });
  next();
};

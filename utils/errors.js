module.exports.handleError = (err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(400).send({
      message: `400 -- Request resulted in ${err.name} with the message: '${err.message}'`,
    });
    return;
  }

  if (err.name === "DocumentNotFoundError") {
    res.status(404).send({
      message: `404 -- Request resulted in ${err.name}: The item or items requested do not exist`,
    });
    return;
  }
  res.status(500).send({
    message: "500 -- An error has occurred on the server",
  });
};

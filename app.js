const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const routes = require("./routes/index");
const { handleError } = require("./utils/errors");
const { limiter } = require("./utils/rateLimiter");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(limiter);
app.use((req, res, next) => {
  req.user = {
    _id: "643e57f149f21c552a30cdfb",
  };
  next();
});
app.use(routes);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

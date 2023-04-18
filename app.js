const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "643e57f149f21c552a30cdfb",
  };
  next();
});
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

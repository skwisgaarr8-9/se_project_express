const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { BAD_REQUEST } = require("../utils/errorCodes");

router.use("/items", itemRoutes);
router.use("/users", userRoutes);
router.use((req, res) => {
  res.status(BAD_REQUEST).send({ message: "Address does not exist" });
});

module.exports = router;

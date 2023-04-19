const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

router.use("/items", itemRoutes);
router.use("/users", userRoutes);
router.use((req, res) => {
  res.status(404).send({ message: "Address does not exist" });
});

module.exports = router;

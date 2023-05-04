const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errorCodes");
const { loginUser, createUser } = require("../controllers/users");

router.use("/items", itemRoutes);
router.use("/users", userRoutes);
router.post("/signin", loginUser);
router.post("/signup", createUser);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Address does not exist" });
});

module.exports = router;

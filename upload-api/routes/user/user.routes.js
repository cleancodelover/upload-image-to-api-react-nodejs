const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require("../../controllers/user/user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create-user", createUser);
router.get("/users", checkToken, getUsers);
router.get("/user/:id", checkToken, getUserById);
router.patch("/update-user", checkToken, updateUser);
router.delete("/delete-user", checkToken, deleteUser);
router.post("/login", login);
module.exports = router;

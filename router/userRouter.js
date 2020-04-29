const express = require("express");
let userRouter = express.Router();
let {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser
} = require("../controller/userController");
let {
  loginUser,
  userSignUp,
  protectRoute,
  forgetPassword,
  resetPassword,
  logoutUser,
  updateMyPassword,
  authorizeeasy
} = require("../controller/authController");
// handler
// routers
userRouter
  .route("")
  .get(getAllUser)
  .post(createUser);
// authentication routes
// resource
userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(userSignUp);
userRouter.route("/logout").get(logoutUser);

userRouter.route("/forgetPassword").post(forgetPassword);
userRouter.route("/resetPassword/:token").patch(resetPassword);
// req.header =>user
userRouter.route("/updateUser").patch(protectRoute, updateUser);
userRouter.route("/updateMyPassword").patch(protectRoute, updateMyPassword);

userRouter
  .route("/:id")
  .get(protectRoute, getUser)
  // req=>updateUser=>// admin
  .patch(protectRoute, authorizeeasy, updateUser)
  .delete(protectRoute, authorizeeasy, deleteUser);
module.exports = userRouter;

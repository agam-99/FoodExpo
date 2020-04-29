const express = require("express");
let viewRouter = express.Router();
let {
  viewHomePage,
  viewLoginPage,
  viewPlansPage,
  viewAccountPage,
  viewPasswordPage,
  viewSignupPage
} = require("../controller/viewController");
// will run for all the cases
let { isloggedIn, protectRoute } = require("../controller/authController");
// image , logout
// locals pug file
viewRouter.use(isloggedIn);
// next()
viewRouter.get("/", viewHomePage);
viewRouter.get("/login", viewLoginPage);
viewRouter.get("/plans", viewPlansPage);
viewRouter.get("/signup", viewSignupPage);
// user data headers
viewRouter.get("/me", protectRoute, viewAccountPage);
viewRouter.get("/password", protectRoute, viewPasswordPage);
// viewRouter.get("/planDetail/",viewPlanDetailsPage);
// viewRouter.get("/BuyPlan/:planID",getCheckout,viewPlanDetailsPage);
module.exports = viewRouter;

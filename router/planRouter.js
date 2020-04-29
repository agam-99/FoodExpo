const express = require("express");
let planRouter = express.Router();
// let obj=require("../controller/plancontroller");
// let createPlan=obj.createPlan();
// createPlan();
let {
  getAllPlans,
  getPlan,
  deletePlan,
  updatePlan,
  createPlan,
  queryIncluder
} = require("../controller/plancontroller");
let { protectRoute,authorize,authorizeeasy } = require("../controller/authController");
// handlers
// routers
//get =>api/plans/2=>"api/plans/:id"
//  middleware
// planRouter.param("id",checkId)
planRouter
  .route("")
  .get(protectRoute, getAllPlans)
  .post(protectRoute,authorize("admin","restaurant-owner"),createPlan);
//aliasing
planRouter.route("/top-5-plans").get(queryIncluder, getAllPlans);
planRouter
  .route("/:id")
  .get(getPlan)
  .patch(protectRoute,authorize("admin","restaurantOwner"),updatePlan)
  .delete(protectRoute,authorizeeasy
    ,deletePlan);
module.exports = planRouter;
// imports
const express = require("express");
const app = express();
// sets security header
const helmet = require("helmet");
// req limit
const rateLimit = require("express-rate-limit");
//
const mongoSanatize = require("express-mongo-sanitize");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "limit crossed by your IP " // limit each IP to 100 requests per windowMs
});
// help to read cookies
const cookieParser = require("cookie-parser");
//  apply to all requests
app.use(limiter);
app.use(helmet());
// frontend
app.use(express.static("public"));
// template
app.set("view engine", "pug");
// views folder
app.set("views", "template");
// parse anything that comes in req.body
app.use(express.json());
// ("/api/plans/:id");
app.use(mongoSanatize());
app.use(cookieParser(), (req, res, next) => {
  // console.log(req.cookies.jwt);
  next();
});
// templating
// view engine
// Routes
const planRouter = require("./router/planRouter");
const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRouter");


// views
app.use("/", viewRouter);
// api
app.use("/api/user", userRouter);
app.use("/api/plans", planRouter);


//
// Middle ware

// app.use("/signup")
// server
module.exports = app;
// const fs = require("fs");
// app.use(express());
// Middleware
// app.use("/",(req,res,next)=>{
//   console.log("Hi from middleWare 👌👌");
//   next();
// })
// handler function
// routes
// Routers=> incoming path => middlewares
// define
// app.get("/api/plans", getAllPlans);
// app.get("/api/user");
// app.get("/api/plans/:id", getPlan);
// app.get("/api/user/:id", getUser);
// app.post("/api/plans", createPlan);
// app.post("/api/user");
// app.patch("/api/plans/:id", updatePlan);
// app.patch("/api/user/:id", updateUser);
// app.delete("/api/plans/:id", deleteUser);
// app.delete("/api/user/:id", deletePlan);

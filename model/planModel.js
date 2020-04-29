const mongoose = require("mongoose");
// const validator
 const validator = require("validator");
 const DB =
  "mongodb+srv://admin:1234abc@cluster0-ufy4c.mongodb.net/test?retryWrites=true&w=majority";
// request
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(conn => {
    // console.log(conn.connection);
    console.log("Connected to DB");
  });
// set of rules
const planSchema = new mongoose.Schema({
  // type validation stru
  name: { type: String, required: true, 
    validate:
    function(){
      return validator.isAlpha(this.name);
    }} 
    ,
  price: { type: Number,default:100},
  description: { type: String, default: "Cool plan" },
  ratingsAverage: {
    type: Number,
    required: true,
    validate: function () {
      return this.ratingsAverage < this.totalRating;
    },
  },
  totalRating: { type: Number, required: true },
  duration: { type: Number, required: true }
});
// collection
const PlanModel = mongoose.model("PlanModel", planSchema);
// 1.
module.exports = PlanModel;
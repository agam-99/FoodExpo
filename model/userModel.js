const mongoose =require("mongoose");
// const validator
const validator=require("validator");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const DB =
  "mongodb+srv://admin:1234abc@cluster0-ufy4c.mongodb.net/test?retryWrites=true&w=majority";
// request
mongoose
  .connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
  })
  .then(() => {
    // console.log(conn.connection);
    console.log("Connected to DB(user)");
  });
// set of rules\
// 10 => "10" "a-z,A-Z"
// let password="fake";

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    validate: validator.isAlpha
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail
  },
  role: {
    type: String,
    enum: ["admin", "restaurantOwner", "cook", "user"],
    default: "user"
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    validate: function() {
      return this.confirmPassword === this.password;
    }
  },
  resetToken: String,
  expiresIn: Date
});
// pre
// encrypt=>hashing
userSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 12);
  // confirm password DB
  this.confirmPassword = undefined;
});
// userSchema.method.checkPassword=async function(userPassword,dbPassword){
// return await  bcrypt.compare(userPassword,dbPassword);
// }
// collection
userSchema.methods.createResetToken = function() {
  // random number generate
  const cryptoToken = crypto.randomBytes(32).toString("hex");
  // encrypt
  this.resetToken = crypto
    .createHash("sha256")
    .update(cryptoToken)
    .digest("hex");
    // token expired in 
  this.expiresIn=Date.now()+1000*60*60  // console.log(this.resetToken, resetToken);
return cryptoToken;
};
const UserModel = mongoose.model("UserModel", userSchema);
// 1.
module.exports = UserModel;

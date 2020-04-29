// Pre ES6
// function constructor
function ObjectMaker(name, properties) {
  this.Name = name;
  this.feature = properties;
  this.getFeatures = function() {
    console.log("Features of " + this.Name + " are " + this.feature);
  };
}
var Bat = new ObjectMaker("Bat", "Wooden");
var Bike = new ObjectMaker("Harley", "Hybrid");
console.log(Bat);
// after ES6
class ObjectMaker {
  constructor(name, properties, fn) {
    this.Name = name;
    this.feature = properties;
    this.myfn = fn;
  }
  getFeatures() {
    console.log("Features of " + this.Name + " are " + this.feature);
  }
}
var Bat = new ObjectMaker("Bat", "Wooden");
var Bike = new ObjectMaker("Harley", "Hybrid");
var Car = new ObjectMaker("Tesla", "Electric", function() {
  console.log("Functions are variables");
});
console.log(Bat);
console.log(Bike);
console.log(Car);

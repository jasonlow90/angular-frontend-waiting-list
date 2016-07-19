angular
  .module('Queuer')
  .controller('CustomerPublicController', CustomerPublicController);

  CustomerPublicController.$inject = ['CustomerPublic', '$watch', '$scope', '$interval'];

function CustomerPublicController(CustomerPublic, $watch, $scope, $interval){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  self.all = [];

  this.getCustomers = function(){
    self.all = CustomerPublic.query();
    console.log(self.all.length);
    console.log("Queried success");
  };

  this.getCustomers(); // Make a .get request to the api to get all the customers into this.all array
  this.timeNow = Date.now(); // Get the date.now when this script is first read
  this.timeInterval = 1000; // ms

  var timer = function(){
    self.timeNow = Date.now(); // Refreshes the time Now every second
  };

  this.$watch('self.timeNow');
  $interval(timer, self.timeInterval); // Runs the timer() function every second

  return this;
}

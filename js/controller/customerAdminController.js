angular
  .module('Queuer')
  .controller('CustomerAdminController', CustomerAdminController);

  CustomerAdminController.$inject = ['CustomerAdmin', '$interval', 'TokenService'];

function CustomerAdminController(CustomerAdmin, $interval, TokenService){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  this.all = [];
  this.admin = {};

  function handleLogin(res) {
  var token = res.token ? res.token : null;

  // Console.log our response from the API
  if(token) {
    console.log(res);
    // display agents
  }

  self.message = res.message;
}

  this.getCustomers = function(){
    self.all = CustomerAdmin.query();
    console.log("Queried success");
  };

  this.authorize = function(){
    console.log(self.admin);
    CustomerAdmin.authorize(self.admin, handleLogin);
  };

  this.getCustomers(); // Make a .get request to the api to get all the customers into this.all array

  this.timeNow = Date.now(); // Get the date.now when this script is first read
  this.timeInterval = 1000; // ms
  var timer = function(delta){
    self.timeNow = Date.now(); // Refreshes the time Now every second
  };
  $interval(timer, self.timeInterval); // Runs the timer() function every second

  return this;
}

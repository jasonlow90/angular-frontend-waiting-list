angular
  .module('Queuer')
  .controller('CustomerAdminController', CustomerAdminController);

  CustomerAdminController.$inject = ['CustomerAdmin', '$interval', 'TokenService', '$window', '$scope', '$state'];

function CustomerAdminController(CustomerAdmin, $interval, TokenService, $window, $scope, $state){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  var timerInterval;
  this.all = [];
  this.customer = {};
  this.staff = {};

  function handleLogin(res) {
  var token = res.token ? res.token : null;

  // Console.log our response from the API
  if(token) {
    console.log(res);
    self.getCustomers();
    // display agents
  }

  self.message = res.message;
}

  function newCustomer(res){
    var customer = res.restaurant ? res.restaurant : null;

    if(customer){
      console.log(customer);
      self.getCustomers();
    }
  }

  this.getCustomers = function(){
    self.all = CustomerAdmin.query();
    console.log("Queried success");
  };

  this.addCustomer = function(){
    CustomerAdmin.save(self.customer, newCustomer);
  };

  this.checkToken = function(){
    console.log("checking token");
    return self.all.length !== 0;
  };

  this.removeToken = function(){
    console.log("hello");
    TokenService.removeToken();
    self.all = [];
    self.staff ={};
    $state.go('root');
  };

  this.authorize = function(){
    console.log("checking authorization");
    CustomerAdmin.authorize(self.staff, handleLogin);

  };

  this.isLoggedIn=function(){
    return !!TokenService.getToken();
  };


  // this.getCustomers(); // Make a .get request to the api to get all the customers into this.all array

  this.timeNow = Date.now(); // Get the date.now when this script is first read

  var timer = function(){
    self.timeNow = Date.now(); // Refreshes the time Now every second
    // console.log('renewing date.now');
    $scope.$digest();
  };

  window.setInterval(timer, 1000); // Runs the timer() function every second
  //
  // this.start();
  if(self.isLoggedIn()) self.getCustomers();

  //
  return this;
}

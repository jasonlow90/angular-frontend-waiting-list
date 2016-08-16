angular
  .module('Queuer')
  .controller('CustomerAdminController', CustomerAdminController);

  CustomerAdminController.$inject = ['CustomerAdmin', '$interval', 'TokenService', '$window', '$scope', '$state', '$stateParams', '$route'];

function CustomerAdminController(CustomerAdmin, $interval, TokenService, $window, $scope, $state, $route, $stateParams){

  var self = this;
  var timerInterval;
  this.all = [];
  this.unsorted = [];
  this.customer = {};
  this.button = "Add Customer";
  self.Math = Math;

  this.getCustomers = function(){

    CustomerAdmin.query({restaurantNameSuburb: $route.restaurantNameSuburb}, function(res){
      self.all = _.sortBy(res, 'finishedWaiting');
    });
    console.log(self.all);
  };

  this.addCustomer = function(){
    self.customer.restaurantNameSuburb = $route.restaurantNameSuburb;
    console.log(self.customer);
    if(self.customer._id){
      CustomerAdmin.update(self.customer, function(res){
        self.getCustomers();
        self.button = "Add Customer";
        self.customer = {};
      });

    } else {

      CustomerAdmin.save(self.customer, function(res){
        // self.all.push(character);
        self.getCustomers();

        self.customer = {};
      });
    }
  };

  this.editCustomer = function(customer){
    self.customer = customer;
    self.button = "Update Customer";
    console.log(self.customer);
  };

  this.deleteCustomer = function(customer){
    customer.restaurantNameSuburb = $route.restaurantNameSuburb;
    console.log(customer);
    CustomerAdmin.remove(customer);
    self.getCustomers();
    // var index = self.all.indexOf(customer);
    // self.all.splice(index, 1);
  };

  this.checkToken = function(){
    console.log("checking token");
    return self.all.length !== 0;
  };

  this.removeToken = function(){
    console.log("hello");
    TokenService.removeToken();
    self.all = [];
    $state.go('root');
  };


  this.isLoggedIn=function(){
    return !!TokenService.getToken();
  };

  this.customerTimer = function(){
    for (var i = 0; i < self.all.length; i++) {
      var minutes = Math.floor((self.all[i].finishedWaiting - self.timeNow)/60000)%60;
      var seconds = Math.floor((self.all[i].finishedWaiting - self.timeNow)/1000)%60;
      self.all[i].waitMinutes = (minutes > -1 || minutes === 0) ? minutes : "Due";
      self.all[i].waitSeconds = seconds.toFixed(2);
    }
  };

  this.timeNow = Date.now();
  var timer = function(){
    self.timeNow = Date.now(); // Refreshes the time Now every second
    // console.log('renewing date.now');
    self.customerTimer();
    $scope.$apply();
  };

  this.logoClick = function(){
    $state.go("home");
  };


  window.setInterval(timer, 1000); // Runs the timer() function every second
  //
  // this.start();
  // if(self.isLoggedIn()) self.getCustomers();
  this.getCustomers();

  //
  return this;
}

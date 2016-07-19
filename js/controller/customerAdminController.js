angular
  .module('Queuer')
  .controller('CustomerAdminController', CustomerAdminController);

  CustomerAdminController.$inject = ['CustomerAdmin', '$interval', 'TokenService', '$window', '$scope', '$state', '$stateParams', '$route'];

function CustomerAdminController(CustomerAdmin, $interval, TokenService, $window, $scope, $state, $route, $stateParams){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  var timerInterval;
  this.all = [];
  this.customer = {};
  this.staff = {};

  // this.$routeParams = "hello";
  console.log($window.decodeURIComponent());
  console.log($route.restaurantNameSuburb)

  this.getCustomers = function(){
    self.all = CustomerAdmin.query({restaurantNameSuburb: $route.restaurantNameSuburb});
    console.log("Queried success");
  };

  this.addCustomer = function(){
    self.customer.restaurantNameSuburb = $route.restaurantNameSuburb;
    console.log(self.customer);
    CustomerAdmin.save(self.customer, function(character){
      console.log(character);
      self.all.push(character);
      self.customer = {};
    });
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


  this.isLoggedIn=function(){
    return !!TokenService.getToken();
  };

  this.getCustomers()
  // var timer = function(){
  //   self.timeNow = Date.now(); // Refreshes the time Now every second
  //   // console.log('renewing date.now');
  //   $scope.$digest();
  // };
  //
  // window.setInterval(timer, 1000); // Runs the timer() function every second
  // //
  // // this.start();
  // if(self.isLoggedIn()) self.getCustomers();

  //
  return this;
}

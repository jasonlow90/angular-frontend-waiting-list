angular
  .module('Queuer')
  .controller('CustomerPublicController', CustomerPublicController);

  CustomerPublicController.$inject = ['CustomerPublic', '$state', '$scope', '$interval', '$route', '$stateParams'];

function CustomerPublicController(CustomerPublic, $state, $scope, $interval, $route, $stateParams){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  self.all = [];
  self.Math = Math;

  this.getCustomers = function(){
    CustomerPublic.query({restaurantNameSuburb: $stateParams.restaurantNameSuburb}, function(res){
      self.all = _.sortBy(res, 'finishedWaiting');
    });
    console.log("Queried success");
  };

  this.customerTimer = function(){
    for (var i = 0; i < self.all.length; i++) {
      var minutes = Math.floor((self.all[i].finishedWaiting - self.timeNow)/60000)%60;
      var seconds = Math.floor((self.all[i].finishedWaiting - self.timeNow)/1000)%60;
      self.all[i].waitMinutes = (minutes > 0) ? minutes : "Due";
      self.all[i].waitSeconds = (minutes > 0) ? seconds : "";

    }
  };

  this.getCustomers(); // Make a .get request to the api to get all the customers into this.all array
  this.timeNow = Date.now();

  var timer = function(){
    self.timeNow = Date.now(); // Refreshes the time Now every second
    console.log(self.all);
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

  return this;
}

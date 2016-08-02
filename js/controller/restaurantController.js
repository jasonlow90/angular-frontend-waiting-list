angular
  .module('Queuer')
  .controller('RestaurantController', RestaurantController);

  RestaurantController.$inject = ['Restaurant', '$scope', '$interval', '$window', '$state', "TokenService", '$routeParams'];

function RestaurantController(Restaurant, $scope, $interval, $window, $state, TokenService, $routeParams){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  self.all = []; // Models for all restaurants
  self.staff = {};
  self.restaurant ={}; // Model for creating a restaurant
  self.eta ;
  self.Math = Math;

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    // Console.log our response from the API
    if(token) {
      // $state.go(self.isLoggedIn() ? ('admin', {restaurantNameSuburb: res.restaurantNameSuburb}) : "home");
    //   if (self.isLoggedIn()) {
        $state.go("admin",{restaurantNameSuburb: res.restaurantNameSuburb});
    //   } else {
    //     $state.go("home");
    //
    //   }
  } else {
    $state.go("home");
    self.message = res.message;
  }
  }

  this.getRestaurants = function(){
    Restaurant.query(function(res){
      self.all = res;
      for (var i = 0; i < self.all.length; i++) {
        var waitingArray = [];
        for(var y =0; y < self.all[i].customers.length; y++){
          waitingArray.push(new Date(self.all[i].customers[y].finishedWaiting));
        }
        self.all[i].longestWait = Math.floor(Math.max.apply(Math, waitingArray));
        // if (self.all[i].eta < 1 && waitingArray.length !== 0) {
        //   self.all[i]. = "Due";
        // } else if (waitingArray.length === 0) {
        //   self.all[i].eta = "--";
        // }
      }

      // console.log(self.all);

    });
  };

  this.restaurantsTimer = function(){
    for (var i = 0; i < self.all.length; i++) {
      var minutes = Math.floor((self.all[i].longestWait - self.timeNow)/60000)%60;
      var seconds = Math.floor((self.all[i].longestWait - self.timeNow)/1000)%60;
      self.all[i].waitMinutes = minutes;
      self.all[i].waitSeconds = seconds;
      self.all[i].waitMinutes = (minutes > -1 || minutes === 0) ? minutes : "--";
      self.all[i].waitSeconds = seconds;

    }
  };

  this.authorize = function(){
    console.log("checking authorization");
    var user = Restaurant.authorize(self.staff, handleLogin);
  };

  this.isLoggedIn=function(){
    return !!TokenService.getToken();
  };

  this.register = function(){
    $state.go("registration");
  };

  this.addRestaurant = function(){
    console.log(self.restaurant);
    Restaurant.save(self.restaurant, function(){
      $state.go("root");
    });
  };

  this.timeNow = Date.now();
  var timer = function(){
    self.restaurantsTimer();
    self.timeNow = Date.now(); // Refreshes the time Now every second
    // console.log('renewing date.now');
    $scope.$apply();
  };


  this.logoClick = function(){
    $state.go("home");
  };



  window.setInterval(timer, 1000); // Runs the timer() function every second
  //

  if ($state.is("root")) $state.go(self.isLoggedIn() ? "admin" : "home");

  this.getRestaurants();
  return this;
}

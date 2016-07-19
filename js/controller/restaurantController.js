angular
  .module('Queuer')
  .controller('RestaurantController', RestaurantController);

  RestaurantController.$inject = ['Restaurant', '$scope', '$interval', '$window', '$state', "TokenService"];

function RestaurantController(Restaurant, $scope, $interval, $window, $state, TokenService){
  // these two methods are the same
  // $scope.awesome = true; //note: $scope is not really a scope. its should be something like $context;
  // $scope.title = 'Home Page!';
  var self = this;
  self.all = [];
  self.staff = {};
  self.waitingArray = [];
  self.eta ;

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    // Console.log our response from the API
    // if(token) {
    //   console.log(res);
    //   // display agents
    // }

    self.message = res.message;
  }

  this.getRestaurants = function(){
    self.all = Restaurant.query();
    for(var i = 0; i > self.all.customers; i++){
      self.waitingArray.push(self.all.customers[i]);
    }
    self.eta = Math.max.apply(Math, self.waitingArray).toFixed(1);
    if (self.eta < 1 && self.waitingArraylength !== 0) {
          self.eta = "Due";
        } else if (self.waitingArraylength === 0) {
          self.eta = "--";
        }
  };

  this.authorize = function(){
    console.log("checking authorization");
    var user = Restaurant.authorize(self.staff, handleLogin);
    // console.log(user);
    $state.go("admin");
    // if (self.isLoggedIn() ? $state.go("admin") : $state.go("home"));

    // $window.location.href = "restaurantView.html?r_"+user.restaurantNameSuburb;
  };

  this.isLoggedIn=function(){
    return !!TokenService.getToken();
    // return false
  };
  // self.isLoggedIn();
  // if ($state.is("root")) $state.go(self.isLoggedIn() ? "admin" : "home");

  this.getRestaurants();
  return this;
}

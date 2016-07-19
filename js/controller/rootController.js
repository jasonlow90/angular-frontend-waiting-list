angular
  .module('Queuer')
  .controller('RootController', RootController);

  RootController.$inject = ['Restaurant', '$window', '$state', "TokenService"];

function RootController(Restaurant , $window, $state, TokenService){
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


  this.authorize = function(){
    console.log("checking authorization");
    var user = Restaurant.authorize(self.staff, handleLogin);
    // console.log(user);
    $state.go("root");
    // if (self.isLoggedIn() ? $state.go("admin") : $state.go("home"));

    // $window.location.href = "restaurantView.html?r_"+user.restaurantNameSuburb;
  };

  this.isLoggedIn=function(){
    return !!TokenService.getToken();
    // return false
  };
// if ($state.is("root")) $state.go(self.isLoggedIn() ? "admin" : "home");
$state.go("home")
  // self.isLoggedIn();

  return this;
}

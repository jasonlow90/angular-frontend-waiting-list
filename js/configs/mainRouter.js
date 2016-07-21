angular
  .module('Queuer')
  .config(MainRouter);

MainRouter.$inject = [ '$stateProvider', '$urlRouterProvider', 'API'];
function MainRouter($stateProvider, $urlRouterProvider, API){
	$stateProvider
		.state('root', {
			url: "",
      template: '<section ui-view></section ui-view>',
      controller: "RestaurantController"
    })
		.state('admin', {
			url: ":restaurantNameSuburb/admin",
			templateUrl: "./_restaurant-admin.html"
		})
		.state('public', {
			url: ":restaurantNameSuburb/public",
			templateUrl: "./_restaurant-public.html"
		})
    .state('registration', {
      url: "registration",
      templateUrl: "./_registration.html",
      controller: "RestaurantController"
    })
    .state('home', {
      url:"",
      templateUrl: "./_home.html",
      controller: "RestaurantController"
    });

	$urlRouterProvider.otherwise("");
}

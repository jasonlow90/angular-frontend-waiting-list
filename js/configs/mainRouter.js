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
			templateUrl: "./views/_restaurant-admin.html"
		})
		.state('public', {
			url: ":restaurantNameSuburb/public",
			templateUrl: "./views/_restaurant-public.html"
		})
    .state('registration', {
      url: "registration",
      templateUrl: "./views/_registration.html",
      controller: "RestaurantController"
    })
    .state('home', {
      url:"",
      templateUrl: "./views/_home.html",
      controller: "RestaurantController"
    });

	$urlRouterProvider.otherwise("");
}

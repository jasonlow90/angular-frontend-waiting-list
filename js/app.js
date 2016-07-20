angular
  .module('Queuer', ['ngResource', 'ui.router', 'ngRoute'])
  .constant('API', 'http://localhost:3000')
  .config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})
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

// 'https://waiting-list-jnp.herokuapp.com' || 'http://localhost:3000'

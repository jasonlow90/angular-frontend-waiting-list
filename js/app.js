angular
  .module('Queuer', ['ngResource', 'ui.router'])
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
      controller: "RootController"
    })
		.state('admin', {
			url: ":restaurantNameSuburb/admin",
			templateUrl: "restaurantView.html"
		})
		.state('public', {
			url: ":restaurantNameSuburb/public",
			templateUrl: "waiting-list-public.html"
		})
    .state('home', {
      url:"hello",
      templateUrl: "home.html",
      controller: "RestaurantController"
    });

	// $urlRouterProvider.otherwise("/");
}

// 'https://waiting-list-jnp.herokuapp.com' || 'http://localhost:3000'

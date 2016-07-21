angular
  .module('Queuer', ['ngResource', 'ui.router', 'ngRoute'])
  .constant('API', 'https://queuer-jnp.herokuapp.com')
  .config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

// 'https://queuer-jnp.herokuapp.com/' || 'http://localhost:3000'

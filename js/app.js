angular
  .module('Queuer', ['ngResource', 'ui.router', 'ngRoute'])
  .constant('API', 'http://localhost:3000')
  .config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

// 'https://waiting-list-jnp.herokuapp.com' || 'http://localhost:3000'

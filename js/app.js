angular
  .module('Queuer', ['ngResource'])
  .constant('API', 'https://waiting-list-jnp.herokuapp.com')
  .config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

// 'https://waiting-list-jnp.herokuapp.com' || 'http://localhost:3000'

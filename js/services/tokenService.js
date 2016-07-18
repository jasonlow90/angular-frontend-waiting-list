angular.module('Queuer').service('TokenService', TokenService);

TokenService.$inject = ['$window'];
function TokenService($window){
  var self =this;

  self.saveToken = function(token){
    return $window.localStorage.setItem('secret-handshake', token);
  };

  self.getToken = function(){
    return $window.localStorage['secret-handshake'];
  };

  self.removeToken = function(){
    return $window.localStorage.removeItem('secret-handshake');
  };

  self.checkToken = function(){
    return $window.localStorage['secret-handshake'] ? true : false;

  };

}

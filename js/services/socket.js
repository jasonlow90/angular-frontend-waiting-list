angular.module('Queuer').service('Socket', Socket);

Socket.$inject = ["API", "$rootScope"];

function Socket (API, $rootScope){
  var self = this;
  var socket = io(API);
    self.on = function(eventName, callback) {
      socket.on(eventName, function(){
        var args = arguments;
        // This forces angular to run a digest cycle to do a dom checking
        // Angular will update the html's dom automatically if there is any changes
         $rootScope.$apply(function(){
           callback.apply(socket, args);
         });
      });
    };

    self.emit = function(eventName, data, callback){
      socket.emit(eventName, data,function(){
        var args = arguments;
        $rootScope.$apply(function() {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    };
}

angular
  .module('Queuer')
  .controller('SocketController', SocketController);

  SocketController.$inject = ['API', 'Socket'];

  function SocketController (API, Socket, $scope){
    var self = this;
    this.messages =[];
    this.message;
    this.name;
    this.newName = "";
    console.log(API);
    // var Socket = io("http://localhost:3000");

    // // To receive message
    // Socket.on('got-message', function(data){
    //   console.log(data.content);
    //   self.messages.push(data.content);
    //   console.log(self.messages);
    // });
    //
    // // To send message
    // this.sendMessage = function (){
    //   console.log('sending message');
    //   Socket.emit('message', {content: self.output});
    //   console.log(self.output);
    //   console.log(self.messages);
    //   self.output = "";
    // };
    // Socket listener;

    // When socket receives an event name called 'init', it will grab the data and assign the value into the local variables
    Socket.on('init', function(data){
      self.name = data.name;
      self.users = data.users;
    });

    //When socket receives an event name called 'send:message', it will grab the data and push the data into self.messages array
    Socket.on('send:message:fromServer', function(message){
      console.log(message);
      self.messages.push(message);
      // $rootScope.$apply();
    });

    Socket.on('change:name', function(data){
      changeName(data.oldName, data.newName);
    });

    Socket.on('user:join', function(data){
      self.messages.push({
        user: 'Chatroom',
        text: 'User ' + data.name + ' has joined.'
      });
      self.users.push(data.name);
    });

    // Add a message to the conversation when a users disconnects or leaves the room

    Socket.on('user:left', function(data){
      self.messages.push({
        user: 'Chatroom',
        text: 'User ' + data.name + ' has left.'
      });
      var i, user;
      for(i = 0; i < self.users.length; i++){
        user = self.users[i];
        if(user === data.name){
          self.users.splice(i, 1);
          break;
        }
      }
    });

    // Private helper

    var changeName = function(oldName, newName){
      var i;
      for (i = 0; i < self.users.length; i++){
        if(self.users[i] === oldName){
          self.users[i] = newName;
        }
      }

      self.messages.push({
        user: 'chatroom',
        text: 'User ' + oldName + ' is now known as ' + newName + '.'
      });
    };

    // Methods published to the scope
    self.changeName = function(){
      Socket.emit('change:name', {
        name: self.newName
      }, function(result){
        if(!result){
          alert('There was an error changing your name');
        } else {
          changeName(self.name, self.newName);

          self.name = self.newName;
          self.newName = '';
        }
      });
    };

    self.sendMessage = function(){
      console.log(self.message)
      Socket.emit('send:message:fromClient', {
        message: self.message
      });

      // Add message to our model locally
      self.messages.push({
        user: self.name,
        text: self.message
      });

      // Clear message box
      self.message = '';
    };
    console.log(Socket);

  }

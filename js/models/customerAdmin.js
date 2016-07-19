angular
  .module('Queuer')
  .factory('CustomerAdmin', CustomerAdmin);

CustomerAdmin.$inject = ['$resource', 'API', '$route'];
function CustomerAdmin($resource, API, $route) {

  return $resource(
    API + '/:restaurantNameSuburb/admin/:phone',
    {restaurantNameSuburb: "@restaurantNameSuburb", phone: '@phone'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true,
  transformResponse: function(data, header){
    // Getting string data in response
    var jsonData = JSON.parse(data); //or angular.fromJson(data)
    var list = [];

    angular.forEach(jsonData, function(item){
      var customer = {};
      customer.customerName = item.customerName;
      customer.eta = item.eta;
      customer.phone = item.phone;
      customer.heads = item.heads;
      customer.startedWaiting = new Date(item.startedWaiting);
      customer.finishedWaiting = new Date(item.finishedWaiting);
      customer._restaurant = item._restaurant;
      customer._id = item._customer;


      list.push(customer);
      // console.log("yes");
    });


    return list;
  }
  },
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'authorize': {
        url: API + '/signin',
        method: 'POST'
      }
    }
  );
}

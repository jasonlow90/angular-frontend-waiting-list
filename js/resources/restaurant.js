angular
  .module('Queuer')
  .factory('Restaurant', Restaurant);

Restaurant.$inject = ['$resource', 'API', '$route'];
function Restaurant($resource, API, $route) {

  return $resource(
    API, {},

    { 'get':       { method: 'GET' },
      'save':      { method: 'POST', url: API + '/restaurant/add' },
      'query':     { method: 'GET', isArray: true,
        transformResponse: function(data, header){
          // Getting string data in response
          var jsonData = JSON.parse(data); //or angular.fromJson(data)
          var list = [];

          angular.forEach(jsonData, function(item){
            var restaurant = {};
            restaurant.restaurantNameSuburb = item.restaurantNameSuburb;
            restaurant.postcode = item.postcode;
            restaurant.suburb = item.suburb;
            restaurant.address = item.address;
            restaurant.website = item.website;
            restaurant.restaurantName = item.restaurantName;
            restaurant.cuisine = item.cuisine;
            restaurant.phone = item.phone;
            restaurant.restaurantEmail = item.restaurantEmail;
            restaurant.customers = item.customers;

            list.push(restaurant);
          });


          return list;
        }
        },
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'authorize': {
        url: API + '/signin',
        method: 'POST',
        transformResponse: function(data,header){
          // Getting string data in response
          var jsonData = JSON.parse(data); //or angular.fromJson(data)

          var restaurant = {};
            restaurant.restaurantNameSuburb = jsonData.restaurant.restaurantNameSuburb;
            restaurant.token = jsonData.token;
            console.log(restaurant);

          return restaurant;
        }
    }
}
);
}

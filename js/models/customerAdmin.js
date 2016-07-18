angular
  .module('Queuer')
  .factory('CustomerAdmin', CustomerAdmin);

CustomerAdmin.$inject = ['$resource', 'API'];
function CustomerAdmin($resource, API) {

  return $resource(
    API + '/eat-me-melbourne/admin',
    {},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'authorize': {
        url: API + '/signin',
        method: 'POST'
      }
    }
  );
}

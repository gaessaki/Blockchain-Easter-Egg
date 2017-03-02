angular.module('bc-easter-egg')
  .factory('Evaluation', function ($resource) {
    return $resource('/api/evaluation/');
});
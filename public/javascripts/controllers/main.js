angular.module('bc-easter-egg')
    .controller('mainController', function($scope) {
        
        $scope.hash = function(block) {
            return sjcl.hash.sha256(block.id + block.nonce + block.data + block.prev);
        } 
    });
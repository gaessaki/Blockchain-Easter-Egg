angular.module('bc-easter-egg')
    .controller('mainController', function($scope) {

        $scope.b1 = {
            num: 1,
            nonce: 42252,
            data: 'test data',
            prev: 'prevhash',
            hash: 'hash would be here'
        }
        
        $scope.hash = function(block) {
            return sjcl.hash.sha256(block.num + block.nonce + block.data + block.prev);
        }
        $scope.update = function(block) {
            block.hash = hash(block);
        }
    });
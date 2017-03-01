angular.module('bc-easter-egg')
    .controller('mainController', function ($scope) {

        $scope.b1 = {
            num: 1,
            nonce: 42252,
            data: 'test data',
            prev: '0000000000000000000000000000000000000000000000000000000000000000',
            hash: 'hash would be here',
            correct: false
        }

        hash = function (block) {
            var sha256 = new jsSHA("SHA-256", "TEXT");
            sha256.update(block.num + block.nonce + block.data + block.prev);
            return sha256.getHash("HEX");
        }

        isCorrect = function(block) {
            if (block.hash.substr(4) == '0000') return true;
            else return false;
        }
        
        $scope.update = function() {
            $scope.b1.hash = hash($scope.b1);
            $scope.b2.hash = hash($scope.b2);
            $scope.b3.hash = hash($scope.b3);
            $scope.b3.prev = $scope.b2.hash;
            
            $scope.b1.correct = isCorrect($scope.b1);
            $scope.b2.correct = isCorrect($scope.b2);
            $scope.b3.correct = isCorrect($scope.b3);
        }
    });

$(document).ready(function () {
    console.log('loaded');
    // $('.bc-down-icon').click(function() {
    //     console.log('clicked');
    //     $('.help-slide-modal').addClass('bc-modal-show');
    // });
});

function showHelp() {
    console.log("clicked");
    document.getElementById('help-slide').classList.remove('help-slide-hide');
    document.getElementById('help-slide').classList.add('help-slide-show');
    
    document.getElementById('bc-chevron').style.display = 'none';
    
}
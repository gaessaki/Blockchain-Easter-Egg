angular.module('bc-easter-egg')
    .controller('mainController', function ($scope) {

        $scope.b1 = {
            num: 1,
            nonce: 42252,
            data: 'test data',
            prev: '0000000000000000000000000000000000000000000000000000000000000000',
            hash: 'hash would be here'
        }

        hash = function (block) {
            var sha256 = new jsSHA("SHA-256", "TEXT");
            sha256.update(block.num + block.nonce + block.data + block.prev);
            return sha256.getHash("HEX");
        }
        $scope.update = function (block) {
            console.log(block);
            block.hash = hash(block);
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
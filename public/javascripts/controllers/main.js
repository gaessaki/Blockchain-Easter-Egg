angular.module('bc-easter-egg')
    .controller('mainController', function ($scope) {

        $scope.b1 = {
            num: 1,
            nonce: 11527,
            data: 'Blockchain is a technology that allows information to be kept on a immutable public ledger in a decentralized manner. It is composed of a list of records known as ______. Each _____ contains a link to a prior block, data such as transactions and metadata such as the timestamp of of it’s creation. A series of linked blocks form a _____. Blockchain is notable for being the first digital currency to solve the problem of _____ spending.',
            prev: '0000000000000000000000000000000000000000000000000000000000000000',
            hash: '7bbac00ec973929d39fb60f50b59d18db399d77007e13d5ade38d764434a040fe',
            correct: false
        }

        $scope.b2 = {
            num: 2,
            nonce: 11231,
            data: 'While research into blockchain precursors was going on in the early 90s, the advent of bitcoin in 2008 brought about the first real public experimentation with blockchain. Bitcoin is a digital currency that was developed by the hereunto identified ‘Satoshi Nakamoto’. Through the use of P2P networking and distributed servers, bitcoin is able to operate autonomously.',
            prev: '0000000000000000000000000000000000000000000000000000000000000000',
            hash: '706107541a4df452b55b346fa1d04936c17d4d223a772835387b8cf84ac0f84b',
            correct: false
        }

        $scope.b3 = {
            num: 3,
            nonce: 24932,
            data: 'Fill in the blanks in block #1 by replacing the underlines with the appropriate term. The proof-of-works require 4 leading zeros to be satisfied.',
            prev: '706107541a4df452b55b346fa1d04936c17d4d223a772835387b8cf84ac0f84b',
            hash: '464ce07834d222b11793a1acb0866bfb1b96e6a1a378de5a8dd1b2804370e6c0',
            correct: false
        }

        hash = function (block) {
            var sha256 = new jsSHA("SHA-256", "TEXT");
            sha256.update(block.num + block.nonce + block.data + block.prev);
            return sha256.getHash("HEX");
        }

        isCorrect = function (block) {
            if (block.hash.substr(0, 4) == '0000') return true;
            else return false;
        }

        mine = function(block) { //:o
            for (var i = 0; i < 100000; i++) {
                var sha256 = new jsSHA("SHA-256", "TEXT");
                sha256.update(block.num + i + block.data + block.prev);
                if (sha256.getHash("HEX").substr(0, 4) == '0000') {
                    console.log(sha256.getHash("HEX"));
                    return i;
                }
            }
        }

                console.log(hash($scope.b3));

        $scope.update = function () {
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
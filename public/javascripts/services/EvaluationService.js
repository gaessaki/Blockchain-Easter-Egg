angular.module('bc-easter-egg')
    .factory('EvaluateService', function EvaluateService(Evaluation) {
    
    return {
        evaluateChallengeTwo: function (hashes, callback) {
            var cb = callback || angular.noop;
            Evaluation.save({
                hashes: hashes
            },
            function (err) {
                console.log(err.data);
                return cb(err.data);
            });
        }
    }
})
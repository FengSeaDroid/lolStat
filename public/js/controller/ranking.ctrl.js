angular.module("lolStat")
    .controller("rankingCtrl", function ($scope, $http, $location) {

        $scope.mode = $location.search().mode || 'RANKED_SOLO_5x5';
        $scope.isSolo = $scope.mode.split('_')[1]==='SOLO';
        $scope.rankings =  {};

        $http.get('/api/rankings/' + $scope.mode).
            success(function (data, status, headers, config) {
                console.info(data);
                $scope.rankings = data;
            });

    });
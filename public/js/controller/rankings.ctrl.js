angular.module("lolStat")
    .controller("rankingsCtrl", function ($scope, $http, $location) {

        $scope.mode = $location.search().mode || 'RANKED_SOLO_5x5';
        showRankings();

        /**
         *  populate $scope.rankings with api call.
         */
        function showRankings() {
            $scope.rankings =  {};
            $scope.loading = true;
            $http.get('/api/rankings/' + $scope.mode).
                success(function (data, status, headers, config) {
                    $scope.rankings = data;
                    $scope.loading = false;
                });
        }

    });
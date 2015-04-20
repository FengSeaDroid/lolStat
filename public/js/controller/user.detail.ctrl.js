angular.module("lolStat")
    .controller("userDetailCtrl", function ($scope, $http, $route, $location) {

        $scope.user = null;
        $scope.loading = false;

        /**
         * Get all maps.
         */
        $http.get('/api/maps/')
            .success(function (data) {
                $scope.maps = data;
            });

        /**
         * Get all champions.
         */
        $http.get('/api/champions/')
            .success(function (data) {
                $scope.champions = data;
            });

        /**
         * Get summoner basic info and recent matches by the summoner name.
         * @param name  Summoner name.
         */
        $scope.find = function (name) {
            $scope.loading = true;
            angular.element('#playerName').val("Loading...").prop('disabled', true);
            $http.get('/api/userBasic/' + name.trim())
                .success(function (data) {
                    $scope.user = data;
                    angular.element('#playerName').val("Find").prop('disabled', false);
                    getRecentMatches();
                })
                .error(function (err) {
                    $scope.loading = false;
                    angular.element('.summonerName').val("User not found");
                    angular.element('#playerName').val("Find Again").prop('disabled', false);
                    $scope.user = null;
                    $scope.matches = null;
                });
        };

        /**
         * Update the recent matches for the same summoner.
         */
        $scope.update = function () {
            $scope.loading = true;
            $scope.matches = [];
            $http.get('/api/updateMatchHistory/' + $scope.user.id)
                .success(function () {
                    getRecentMatches();
                })
        };

        /**
         * Get recent matches for the summoner with the summonerId as $scope.user.id
         */
        function getRecentMatches() {
            $http.get('/api/matchHistory/' + $scope.user.id)
                .success(function (data) {
                    $scope.matches = data;
                    $scope.loading = false;
                });
        }
    });
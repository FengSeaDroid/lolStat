angular.module("lolStat")
    .controller("userDetailCtrl", function ($scope, $http, $route, $location) {

        $scope.user = null;
        $scope.loading = false;

        $http.get('/api/maps/')
            .success(function (data) {
                $scope.maps = data;
            });

        $http.get('/api/champions/')
            .success(function (data) {
                $scope.champions = data;
            });

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

        $scope.update = function () {
            $scope.loading = true;
            $scope.matches = [];
            $http.get('/api/updateMatchHistory/' + $scope.user.id)
                .success(function () {
                    getRecentMatches();
                })
        };

        function getRecentMatches() {
            $http.get('/api/matchHistory/' + $scope.user.id)
                .success(function (data) {
                    $scope.matches = data;
                    $scope.loading = false;
                });
        }
    });
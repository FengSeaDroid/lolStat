angular.module("lolStat")
    .controller("userDetailCtrl", function ($scope, $http) {

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
            $http.get('/api/userBasic/' + name)
                .success(function (data) {
                    console.log(data);
                    $scope.user = data;
                    angular.element('#playerName').val("Find").prop('disabled', false);
                    $http.get('/api/matchHistory/' + $scope.user.id)
                        .success(function (data) {
                            $scope.matches = data;
                            console.log(data);
                            $scope.loading = false;
                        });
                });
        };
    });
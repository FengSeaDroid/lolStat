angular.module("lolStat")
    .controller("userDetailControl", function ($scope, $http) {

        $scope.user = null;
        $scope.loading = false;

        $scope.find = function (name) {
            $scope.loading = true;
            angular.element('#playerName').val("Loading...").prop('disabled', true);
            $http.get('/api/userBasic?name=' + name).
                success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.user = data;
                    angular.element('#playerName').val("Find").prop('disabled', false);
                });
        }
    });
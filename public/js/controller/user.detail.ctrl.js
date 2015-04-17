angular.module("lolStat")
    .controller("userDetailCtrl", function ($scope, $http) {

        $scope.user = null;
        $scope.loading = false;

        $scope.find = function (name) {
            $scope.loading = true;
            angular.element('#playerName').val("Loading...").prop('disabled', true);
            $http.get('/api/userBasic/' + name).
                success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.user = data;
                    $scope.user.revisionDate = new Date($scope.user.revisionDate).toUTCString();
                    angular.element('#playerName').val("Find").prop('disabled', false);
                });
        }
    });
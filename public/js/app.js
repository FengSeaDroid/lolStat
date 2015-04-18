angular.module("lolStat", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/user", {
            templateUrl: "/views/user.html"
        }).when("/rankings", {
            templateUrl: "/views/rankings.html"
        }).otherwise({
            redirectTo: '/user'
        });
    })
    .controller("appCtrl", function ($scope,$location) {
        $scope.isActive = function (route) {
            return route === $location.path();
        }
    });
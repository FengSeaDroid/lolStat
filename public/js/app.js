angular.module("lolStat", ["ngRoute"])
    .config(function ($routeProvider) {

        $routeProvider.when("/rankings", {
            templateUrl: "/views/rankings.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/user.html"
        });
    });
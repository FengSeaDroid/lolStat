angular.module("lolStat", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "/views/user.html"
        });

        $routeProvider.when("/rankings", {
            templateUrl: "/views/rankings.html"
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
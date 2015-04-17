angular.module("lolStat", ["ngRoute"])
    .config(function ($routeProvider) {

        $routeProvider.when("/ranking", {
            templateUrl: "/views/ranking.html"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/user.html"
        });
    });
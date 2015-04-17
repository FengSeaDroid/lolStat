
exports.basic = function (req, response) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + req.query.name + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, res) {
            response.send(res.body);
        });
};
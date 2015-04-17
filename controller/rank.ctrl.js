module.exports = function (req, res) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v2.5/league/master?type=' + req.params.mode + '&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            console.log(data.body);
            res.json(data.body);
        });
};
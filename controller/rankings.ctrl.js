var Rankings = require('mongoose').model('Rankings');
var MAX_AGE = 5;

module.exports = function (req, res) {

    var rankings = {};
    Rankings.findOne({queue: req.params.mode}, function (err, result) {
        if (err) {
            res.status(400).json(err);
        } else {
            rankings = result;
            if (!rankings)
                rankings = readAndSave(req.params.mode, res);
            else if (rankings.age > MAX_AGE) {
                rankings.remove(function (err) {
                    if (err) res.status(400).json(err);
                    else rankings = readAndSave(req.params.mode, res);
                });
            }
            else {
                res.json(rankings);
            }
        }
    });

};

function readAndSave(mode, res) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v2.5/league/master?type=' + mode + '&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            if (err) {
                res.status(400).json(err);
            } else {
                var rankings = new Rankings(data.body);
                rankings.save(function (saveerr) {
                    if (saveerr) {
                        res.status(400).json(saveerr);
                    } else {
                        res.json(rankings);
                    }
                });
            }
        });
}
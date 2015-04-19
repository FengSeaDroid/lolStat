var Rankings = require('mongoose').model('Rankings');
var MAX_AGE = 5;

module.exports = function (req, res) {
    var rankings = {};
    Rankings.findOne({queue: req.params.mode}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            rankings = result;
            if (!rankings)
                rankings = readAndSave(req.params.mode, function (rankings) {
                    res.json(rankings);
                });
            else if (rankings.age > MAX_AGE) {
                rankings.remove(function (err) {
                    if (err) res.status(500).json(err);
                    else rankings = readAndSave(req.params.mode, function (rankings) {
                        res.json(rankings);
                    });
                });
            }
            else {
                res.json(rankings);
            }
        }
    });
};

function readAndSave(mode, callBack) {
    var url = 'https://na.api.pvp.net/api/lol/na/v2.5/league/master?type=' + mode + '&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
    require('../service/commons').readAndSave(url, Rankings, callBack);
}
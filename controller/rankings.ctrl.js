/**
 * Rankings controller.
 * @type {*|Model}
 */

var Rankings = require('mongoose').model('Rankings');
/**
 * Max age of rankings before it will be updated in days.
 * @type {number}   The number represent days.
 */
var MAX_AGE = 5;

/**
 * Get the rankings of a particular mode. If the rankings in the db is older than Max_AGE, query
 * riot api to get the new rankings and save to db.
 * @param req   req.params.mode represents the mode of the rankings to be queried.
 * @param res   Send the rankings json with the response.
 */
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

/**
 * Read rankings from riot api and save to db.
 * @param mode      mode of the rankings
 * @param callBack  After save the rankings callBack will be invoked.
 */
function readAndSave(mode, callBack) {
    var url = 'https://na.api.pvp.net/api/lol/na/v2.5/league/master?type=' + mode + '&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
    require('../service/commons').readAndSave(url, Rankings, callBack);
}
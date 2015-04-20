/**
 * Controller for accessing Match objects.
 * @type {*|Model}
 */
var Match = require('mongoose').model('Match');

/**
 * When updating or retrieve recent matches, the number of matches retrieved.
 * @type {number}
 */
var NUMBER_OF_RECENT_MATCHES = 5;

/**
 * Find one match using matchId.
 * @param req   use req.paramspmatchId for query.
 * @param res   Retuen the match object with the response.
 */
exports.findOne = function (req, res) {
    var match = {};
    Match.findOne({matchId: req.params.matchId}, function (err, result) {
        match = result;
        if (!match)
            match = readAndSave(req.params.matchId, function (match) {
                res.json(match);
            });
        else {
            res.json(match);
        }
    });
};

/**
 * Get a list of recent matches for a given summoner.
 *
 * @param request   request.params.summonerId represents the summoner.
 * @param response
 */
exports.matchHistory = function (request, response) {
    Match.find({'participantIdentities.player.summonerId': request.params.summonerId}).sort('-matchCreation').limit(NUMBER_OF_RECENT_MATCHES).exec(function (err, matches) {
        if (matches.length < NUMBER_OF_RECENT_MATCHES) {
            matches = [];
            getRecentMatch(request.params.summonerId, pushToOutput, function () {
                response.json([])
            });
            /**
             * Inner function to put matches into response object once the number of matches retrieved is equal to the finalSize.
             * @param finalSize     The size of the matches which should be retrieved.
             * @returns {Function}  The callback function for the retrieve async operation.
             */
            function pushToOutput(finalSize) {
                return function (match) {
                    matches.push(match);
                    if (matches.length === finalSize) {
                        response.json(matches.sort(function (a, b) {
                            return b.matchCreation - a.matchCreation;
                        }).map(findSummonerParticipantId));
                    }
                }
            }
        } else
            response.json(matches.map(findSummonerParticipantId));
    });
    /**
     * Inner function to create a thisParticipant attribute on the match,
     * which represent the participantId of the summoner that the match history is retrieved for.
     * @param match
     * @returns {Array|Object|Binary|*}
     */
    function findSummonerParticipantId(match) {
        match = match.toObject();
        match.thisParticipantId = match.participantIdentities.filter(function (elem) {
            return elem.player.summonerId == request.params.summonerId;
        })[0].participantId;
        return match;
    }
};

/**
 * Update the most recent matches of a given summoner and store the matches in the db.
 * @param req   req.params.summonerId repreesnts the summoner for who the recent matches should be updated.
 * @param res   If update successful. Send a success message to the response object.
 */
exports.updateHistory = function (req, res) {
    var stack = [];
    getRecentMatch(req.params.summonerId, function (finalSize) {
        return function () {
            stack.push(1);
            if (stack.length === finalSize) {
                res.send('Update successful.');
            }
        }
    }, function () {
        res.status(500);
        res.send();
    });
};

/**
 * Get recent matches for a summoner represented by the summonerId. The function first calls for the list of the recent matches from riot api
 * which only contains partial information about the matches. If this step fails the failedCallback will be called. Otherwise callBack function will be
 * called to give the size of the list. Afterwards the function query the db for each match from the list and if the match is not in the db,
 * query the riot api again to retrieve the full match info and write to the db. Each time the db query happens the partially applied callBack
 * function will be called.
 *
 * @param summonerId
 * @param callBack          A curried function. The first parameter is the size of the list. The second parameter is each match.
 * @param failedCallBack
 */
function getRecentMatch(summonerId, callBack, failedCallBack) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?beginIndex=0&endIndex=' + NUMBER_OF_RECENT_MATCHES + '&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            if (data.body['matches']) {
                data.body.matches.forEach(function (elem) {
                    Match.findOne({matchId: elem.matchId}, function (err, result) {
                        if (!result) {
                            readAndSave(elem.matchId, callBack(data.body.matches.length));
                        } else {
                            callBack(data.body.matches.length)(result);
                        }
                    })
                });

            } else
                failedCallBack();
        });
}

/**
 * Read the riot api for a match and save.
 * @param matchId
 * @param callBack  After save, the callback function will be called.
 */
function readAndSave(matchId, callBack) {
    var url = 'https://na.api.pvp.net/api/lol/na/v2.2/match/' + matchId + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
    require('../service/commons').readAndSave(url, Match, callBack);
}


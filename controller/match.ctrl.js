var Match = require('mongoose').model('Match');

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

exports.matchHistory = function (request, response) {
    Match.find({'participantIdentities.player.summonerId': request.params.summonerId}).sort('-matchCreation').limit(5).exec(function (err, matches) {
        if (matches.length < 5) {
            matches = [];
            getRecentMatch(request.params.summonerId, pushToOutput, function () {
                response.json([])
            });
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
    function findSummonerParticipantId(match) {
        match = match.toObject();
        match.thisParticipantId = match.participantIdentities.filter(function (elem) {
            return elem.player.summonerId == request.params.summonerId;
        })[0].participantId;
        return match;
    }
};

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

function getRecentMatch(summonerId, callBack, failedCallBack) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + summonerId + '?beginIndex=0&endIndex=5&api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
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

function readAndSave(matchId, callBack) {
    var url = 'https://na.api.pvp.net/api/lol/na/v2.2/match/' + matchId + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
    require('../service/commons').readAndSave(url, Match, callBack);
}


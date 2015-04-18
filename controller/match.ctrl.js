var Match = require('mongoose').model('Match');

exports.findOne = function (req, res) {
    var match = {};
    Match.findOne({matchId: req.params.matchId}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            match = result;
            if (!match)
                match = readAndSave(req.params.matchId, function (match) {
                    res.json(match)
                });
            else {
                res.json(match);
            }
        }
    });
};

exports.matchHistory = function (request, response) {
    Match.find({'participantIdentities.player.summonerId': request.params.summonerId}).sort('-matchCreation').limit(5).exec(function (err, matches) {
        if (matches.length < 5) {
            var beforeLength = matches.length;
            require("superagent")
                .get('https://na.api.pvp.net/api/lol/na/v2.2/matchhistory/' + request.params.summonerId + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
                .end(function (err, data) {
                    if (err) {
                        response.status(500).json(err);
                    } else {
                        console.log(data.body.matches.length);
                        data.body.matches.forEach(function (elem) {
                            readAndSave(elem.matchId, function (match) {
                                matches.push(match);
                                if (matches.length === data.body.matches.length + beforeLength) {
                                    response.json(matches.sort(function (a, b) {
                                        return b.matchCreation - a.matchCreation;
                                    }).slice(0, 5));
                                }
                            })
                        });

                    }
                });
        } else
            response.json(matches);
    });
};

function readAndSave(matchId, callBack) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v2.2/match/' + matchId + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            if (err) {
            } else {
                var match = new Match(data.body);
                match.save(function (saveerr) {
                    if (saveerr) {
                    } else {
                        callBack(match);
                    }
                });
            }
        });
}

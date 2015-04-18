var UserBasic = require('mongoose').model('UserBasic');

exports.basic = function (request, response) {
    var user = {};
    UserBasic.findOne({name: request.params.name.toLowerCase()}, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            user = result;
            if (!user)
                user = readAndSaveBasic(request.params.name.toLowerCase(), function (userBasic) {
                    response.json(userBasic);
                });
            else {
                response.json(user);
            }
        }
    });
};

function readAndSaveBasic(username, callBack) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + username + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            if (err) {
            } else {
                var userBasic = new UserBasic(data.body[username]);
                userBasic.name = userBasic.name.toLowerCase();
                userBasic.save(function (saveerr) {
                    if (saveerr) {
                    } else {
                        callBack(userBasic);
                    }
                });
            }
        });
}
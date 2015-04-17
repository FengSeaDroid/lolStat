var UserBasic = require('mongoose').model('UserBasic');

exports.basic = function (request, response) {
    var user = {};
    UserBasic.findOne({_name: request.query.name}, function (err, result) {
        if (err) {
            return error;
        } else {
            user = result;
            if (!user)
                user = readAndSave(request.query.name, response);
            else
                response.json(user);
        }
    });
};

function readAndSave(username, response) {
    require("superagent")
        .get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + username + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            var userBasic = new UserBasic(data.body[username]);
            userBasic.save(function (saveerr) {
                if (saveerr) {
                    return saveerr;
                } else {
                    response.json(userBasic);
                }
            });
        });
}
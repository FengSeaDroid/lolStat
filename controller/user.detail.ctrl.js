/**
 * User Detail Controller
 */

var UserBasic = require('mongoose').model('UserBasic');

/**
 * Get the summoner basic info with a given summoner name.
 * @param request   request.params.name represents the summoner name.
 * @param response
 */
exports.basic = function (request, response) {
    var user = {};
    UserBasic.findOne({name: request.params.name.toLowerCase()}, function (err, result) {
        if (err) {
            response.status(500).json(err);
        } else {
            user = result;
            if (!user)
                user = readAndSaveBasic(request.params.name.toLowerCase(), function (userBasic) {
                    if(userBasic['id'])
                        response.json(userBasic);
                    else{
                        response.status(404);
                        response.send();
                    }
                });
            else {
                response.json(user);
            }
        }
    });
};

/**
 * Read the summoner basic info from riot api and save to db.
 * @param username  Summoner name.
 * @param callBack  Callback when the basic info is saved.
 */
function readAndSaveBasic(username, callBack) {
    var url = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + username + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
    require('../service/commons').readAndSave(url, UserBasic, callBack, username);
}
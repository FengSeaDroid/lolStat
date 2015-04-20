/**
 * Commmon function for read an entity from a remote api and save to db.
 * @param url       The remote api for fetching the object.
 * @param Model     The Model schema for saving the object.
 * @param callBack  When saved callBack will be invoked.
 * @param responseAttribute
 *                   If the object of interest is an attribute of the json object provided by the
 *                   remote api call, use this parameter to retrieve only that attribute.
 */
exports.readAndSave = function (url, Model, callBack, responseAttribute) {
    require("superagent")
        .get(url)
        .end(function (err, data) {
            var model;
            if (responseAttribute)
                model = new Model(data.body[responseAttribute]);
            else
                model = new Model(data.body);
            model.save(function (saveErr) {
                callBack(model);
            });
        });
};

/**
 * Update static info of the game.
 * @param callBack  callback will be invoked after static info is updated.
 */
exports.updateStaticInfo = function (callBack) {
    updateChampion(function () {
        if(callBack)
            updateMap(callBack);
        else
            updateMap(function () {
                console.log('finished updating.')
            });
    });
};

/**
 * Update all champions.
 */
function updateChampion(callBack) {
    var Champion = require('mongoose').model('Champion');
    require("superagent")
        .get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            var champions = data.body.data;
            var accumulator = [], count = 0;
            for (var key in champions) {
                if (champions.hasOwnProperty(key)) {
                    ++count;
                    Champion.findOneAndUpdate({id: champions[key].id}, champions[key], {upsert: true}, function (saveErr) {
                        accumulator.push(1);
                        if (accumulator.length === count) callBack();
                    })
                }
            }
        });
}

/**
 * Update all maps.
 */
function updateMap(callBack) {
    var Map = require('mongoose').model('Map');
    require("superagent")
        .get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/map?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            var maps = data.body.data;
            var accumulator = [], count = 0;
            for (var key in maps) {
                if (maps.hasOwnProperty(key)) {
                    ++count;
                    Map.findOneAndUpdate({mapId: maps[key].mapId}, maps[key], {upsert: true}, function (saveErr) {
                        accumulator.push(1);
                        if (accumulator.length === count) callBack();
                    })
                }
            }
        });
}
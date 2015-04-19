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

exports.updateStaticInfo = function () {
    updateChampion();
    updateMap();
    console.log("Finished updating static info")
};

function updateChampion() {
    var Champion = require('mongoose').model('Champion');
    require("superagent")
        .get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            var champions = data.body.data;
            for (var key in champions) {
                if (champions.hasOwnProperty(key)) {
                    Champion.findOneAndUpdate({id: champions[key].id}, champions[key], {upsert: true}, function (saveErr) {
                    })
                }
            }
        });
}

function updateMap() {
    var Map = require('mongoose').model('Map');
    require("superagent")
        .get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/map?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22')
        .end(function (err, data) {
            var maps = data.body.data;
            for (var key in maps) {
                if (maps.hasOwnProperty(key)) {
                    Map.findOneAndUpdate({mapId: maps[key].mapId}, maps[key], {upsert: true}, function (saveErr) {
                    })
                }
            }
        });
}
exports.findAllMap = function (req, res) {
    var Map = require('mongoose').model('Map');
    Map.find({}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
};

exports.findAllChampion = function (req, res) {
    var Champion = require('mongoose').model('Champion');
    Champion.find({}, function (err, result) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
};

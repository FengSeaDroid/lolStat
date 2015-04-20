/**
 * Module for static info controller about the game.
 */


/**
 * Find all map objects.
 * @param req
 * @param res
 */
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

/**
 * Find all champion objects.
 * @param req
 * @param res
 */
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

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../models/map.model');
    require('../models/champion.model');
    require('../models/user.basic.model');
    require('../models/rankings.model');
    require('../models/match.model');
    return db;
};
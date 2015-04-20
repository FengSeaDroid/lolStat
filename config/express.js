/**
 * Configure express parameters.
 * @type {*|exports} The express instance.
 */
var express = require('express'),
    config = require('./config');

module.exports = function () {
    var app = express();
    require('../routes/home.route')(app);
    require('../routes/user.detail.api.route')(app);
    require('../routes/rankings.api.route')(app);
    require('../routes/match.api.route')(app);
    require('../routes/staticInfo.api.route')(app);
    app.set('port', config.port);

    app.use(express.static('./public'));
    return app;
};
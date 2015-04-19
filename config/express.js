var express = require('express');
module.exports = function() {
    var app = express();
    require('../routes/home.route')(app);
    require('../routes/user.detail.api.route')(app);
    require('../routes/rankings.api.route')(app);
    require('../routes/match.api.route')(app);
    require('../routes/staticInfo.api.route')(app);
    app.set('port', 3000);

    app.use(express.static('./public'));
    return app;
};
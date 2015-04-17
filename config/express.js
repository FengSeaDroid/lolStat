var express = require('express');
module.exports = function() {
    var app = express();
    require('../routes/home.route.js')(app);
    require('../routes/user.detail.route.js')(app);
    app.set('port', 3000);

    app.use(express.static('./public'));
    return app;
};
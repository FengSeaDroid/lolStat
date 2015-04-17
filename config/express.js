var express = require('express');
module.exports = function() {
    var app = express();
    require('../routes/home.js')(app);
    require('../routes/userDetail.js')(app);
    app.set('port', 3000);

    app.use(express.static('./public'));
    return app;
};
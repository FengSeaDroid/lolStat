process.env.NODE_ENV = 'dev';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();
var app = express();

var boot = function () {
    require('./service/commons').updateStaticInfo();
    app.server = app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    });
};

var shutdown = function () {
    app.server.close();
};

if (require.main === module) {
    boot();
}
else {
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
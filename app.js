/**
 * Entrance point of the lol game statistics application.
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Configure mongoose and express
 */
var db = require('./config/mongoose')(),
    app = require('./config/express')();

/**
 * Setting up web server.
 */
var boot = function () {
    require('./service/commons').updateStaticInfo();
    app.server = app.listen(app.get('port'), function () {
        console.info('Express server listening on port ' + app.get('port'));
    });
};

/**
 * Server shutdown.
 */
var shutdown = function () {
    app.server.close();
};

/**
 * If run with main thread start server, otherwise exports major functionalities.
 */
if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.app = app;
    exports.db = db;
    exports.port = app.get('port');
}
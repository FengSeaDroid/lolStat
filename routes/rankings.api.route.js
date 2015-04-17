module.exports = function(app) {

    app.get('/api/rankings/:mode', require("../controller/rankings.ctrl"));

};
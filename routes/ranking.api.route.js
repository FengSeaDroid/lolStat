module.exports = function(app) {

    app.get('/api/rankings/:mode', require("../controller/rank.ctrl"));

};
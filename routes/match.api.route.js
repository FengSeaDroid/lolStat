module.exports = function (app) {

    app.get('/api/match/:matchId', require("../controller/match.ctrl").findOne);
    app.get('/api/matchHistory/:summonerId', (require("../controller/match.ctrl").matchHistory));
    app.get('/api/updateMatchHistory/:summonerId',(require("../controller/match.ctrl").updateHistory))

};
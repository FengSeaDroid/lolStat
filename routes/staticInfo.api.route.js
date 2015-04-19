module.exports = function(app) {

    app.get('/api/maps/', require("../controller/staticInfo.ctrl").findAllMap);
    app.get('/api/champions/', require("../controller/staticInfo.ctrl").findAllChampion);

};
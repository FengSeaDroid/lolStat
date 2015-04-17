module.exports = function(app) {

    app.get('/api/userBasic/:name', require("../controller/user.detail.ctrl").basic);
    app.get('/api/matchHistory/:id', require("../controller/user.detail.ctrl").matchHistory);

};
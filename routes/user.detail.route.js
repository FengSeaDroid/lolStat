module.exports = function(app) {
    app.get('/api/userBasic', require("../controller/user.detail.ctrl.js").basic);
};
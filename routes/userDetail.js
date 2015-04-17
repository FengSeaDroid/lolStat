module.exports = function(app) {
    app.get('/api/userBasic', require("../controller/userDetail.js").basic);
};
/**
 * Route for summoner info controller.
 */

module.exports = function(app) {
    app.get('/api/userBasic/:name', require("../controller/user.detail.ctrl").basic);
};
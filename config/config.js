/**
 * Get configurations based on env variable
 */
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
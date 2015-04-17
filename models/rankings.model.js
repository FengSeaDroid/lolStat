var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var RankingsSchema = new Schema({
    "name": String,
    "tier": String,
    "queue": String,
    "createDate": Number,
    "entries": Array
});
mongoose.model('Rankings', RankingsSchema);
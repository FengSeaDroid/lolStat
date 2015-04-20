/**
 * Champion model
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ChampionSchema = new Schema({
    key: String,
    id: {type: Number, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    title: String
});
mongoose.model('Champion', ChampionSchema);
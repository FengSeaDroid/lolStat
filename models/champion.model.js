var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ChampionSchema = new Schema({
    key: String,
    id: {type: Number,unique: true},
    name: {type: String, unique: true},
    title: String
});
mongoose.model('Champion', ChampionSchema);
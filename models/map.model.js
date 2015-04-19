var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MapSchema = new Schema({
    mapName: {type: String, unique: true},
    mapId: {type: Number, unique: true}
});
mongoose.model('Map', MapSchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MapSchema = new Schema({
    mapName: {type: String, unique: true, required: true},
    mapId: {type: Number, unique: true, required: true}
});
mongoose.model('Map', MapSchema);
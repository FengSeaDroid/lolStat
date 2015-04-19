var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserBasicSchema = new Schema({
    name: {type: String, unique: true, lowercase: true, trim: true},
    id: {type: Number, unique: true},
    profileIconId: Number,
    revisionDate: Date,
    summonerLevel: Number
});
mongoose.model('UserBasic', UserBasicSchema);
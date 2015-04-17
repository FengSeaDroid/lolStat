var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserBasicSchema = new Schema({
    name: String,
    id: Number,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number
});
mongoose.model('UserBasic', UserBasicSchema);
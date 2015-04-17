var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var RankingsSchema = new Schema({
    name: String,
    tier: String,
    queue: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    entries: Array
});

RankingsSchema.virtual('age').get(function () {
    return Math.floor((new Date() - this.createDate) / (1000 * 3600 * 24));
});

RankingsSchema.set('toJSON', {virtuals: true});
mongoose.model('Rankings', RankingsSchema);
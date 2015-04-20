/**
 * Match model
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MatchSchema = new Schema({
    matchId: {type: Number, unique: true, required: true},
    matchMode: String,
    matchType: String,
    matchCreation: Date,
    matchDuration: Number,
    queueType: String,
    map: Number,
    mapId: Number,
    season: String,
    matchVersion: String,
    participants: [{
        teamId: Number,
        championId: Number,
        highestAchievedSeasonTier: String,
        stats: {
            winner: Boolean,
            champLevel: Number,
            kills: Number
        },
        participantId: Number
    }],
    participantIdentities: [{
        participantId: Number,
        player: {
            summonerId: Number,
            summonerName: String
        }
    }]
});

//MatchSchema.pre('save', function (next) {
//    var Map = require('mongoose').model('Map');
//    Map.findOne({mapId: this.mapId}, function (err, data) {
//        console.log(data._id);
//        this.map = data._id;
//        next();
//    })
//});

mongoose.model('Match', MatchSchema);
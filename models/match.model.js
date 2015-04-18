var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MatchSchema = new Schema({
    matchId: {type: Number, unique: true},
    matchMode: String,
    matchType: String,
    matchCreation: Date,
    matchDuration: Number,
    queueType: String,
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
mongoose.model('Match', MatchSchema);
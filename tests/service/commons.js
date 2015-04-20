var app = require('../../app'),
    should = require('should'),
    Commons = require('../../service/commons'),

    mongoose = require('mongoose'),
    Map = mongoose.model('Map'),
    Champion = mongoose.model('Champion'),
    Match = mongoose.model('Match');


describe('Commons Unit Tests:', function () {

    describe('Test fetching maps and champions', function () {
        this.timeout(3000);
        it('Should get 4 maps', function (done) {
            Commons.updateStaticInfo(function () {
                Map.find({}, function (err, data) {
                    data.length.should.be.exactly(4);
                    done();
                });
            });
        });

        it('Should get 124 champions', function (done) {
            Commons.updateStaticInfo(function () {
                Champion.find({}, function (err, data) {
                    data.length.should.be.exactly(124);
                    done();
                });
            });

        });

        afterEach(function (done) {
            Champion.remove(function () {
                Map.remove(function () {
                    done();
                });
            });
        })
    });

    describe('Test read and save', function () {
        this.timeout(3000);
        it('Get a match from riot api and save it', function (done) {
            var url = 'https://na.api.pvp.net/api/lol/na/v2.2/match/' + 1722333444 + '?api_key=48bb8ab1-2559-4225-949b-f9b45ea77e22';
            Commons.readAndSave(url, Match, function () {
                Match.findOne({matchId:1722333444},function(err,data){
                    data.matchCreation.should.eql(new Date(1423282669221));
                    data.matchDuration.should.be.exactly(2432);
                    done();
                })
            });
        });

        afterEach(function (done) {
            Match.remove(function () {
                done();
            });
        })
    });

});

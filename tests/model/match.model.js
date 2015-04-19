var app = require('../../app'),
    should = require('should'),
    mongoose = require('mongoose'),
    Match = mongoose.model('Match');

var match;

describe('Match Model Unit Tests:', function () {
    beforeEach(function (done) {
        match = new Match({
            matchId: 1,
            mapId: 1
        });
        done();
    });

    describe('Testing the save method', function () {
        it('Should be able to save without problems', function (done) {
            match.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should not be able to save',
            function (done) {
                match.matchId = NaN;
                match.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
    });

    describe('Test find method', function () {
        it('Should be able to find one', function (done) {
            match.save(function (saveErr) {
                Match.find({matchId: 1}, function (err, data) {
                    data.length.should.be.exactly(1);
                    done();
                })
            });
        });
    });

    afterEach(function (done) {
        Match.remove(function () {
            done();
        });
    })
});

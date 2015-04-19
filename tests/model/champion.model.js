var app = require('../../app'),
    should = require('should'),
    mongoose = require('mongoose'),
    Champion = mongoose.model('Champion');

var champion;

describe('Champion Model Unit Tests:', function () {
    beforeEach(function (done) {
        champion = new Champion({
            key: 'key',
            name: 'Feng',
            id: 1,
            title: 'The job seeker'
        });
        done();
    });

    describe('Testing the save method', function () {
        it('Should be able to save without problems', function (done) {
            champion.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should not be able to save',
            function (done) {
                champion.id = NaN;
                champion.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
    });

    describe('Test find method', function () {
        it('Should be able to find one', function (done) {
            champion.save(function (saveErr) {
                Champion.find({name: 'Feng'}, function (err, data) {
                    data.length.should.be.exactly(1);
                    done();
                })
            });
        });
    });

    afterEach(function (done) {
        Champion.remove(function () {
            done();
        });
    })
});

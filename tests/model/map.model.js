var app = require('../../app'),
    should = require('should'),
    mongoose = require('mongoose'),
    Map = mongoose.model('Map');

var map;

describe('Map Model Unit Tests:', function () {
    beforeEach(function (done) {
        map = new Map({
            mapName: 'mockMap',
            mapId: 1
        });
        done();
    });

    describe('Testing the save method', function () {
        it('Should be able to save without problems', function (done) {
            map.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should not be able to save',
            function (done) {
                map.mapId = NaN;
                map.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
    });

    describe('Test find method', function () {
        it('Should be able to find one', function (done) {
            map.save(function (saveErr) {
                Map.find({mapId: 1}, function (err, data) {
                    data.length.should.be.exactly(1);
                    done();
                })
            });
        });
    });

    afterEach(function (done) {
        Map.remove(function () {
            done();
        });
    })
});

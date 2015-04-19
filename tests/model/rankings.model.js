var app = require('../../app'),
    should = require('should'),
    mongoose = require('mongoose'),
    Rankings = mongoose.model('Rankings');

var rankings;
var saveDate;

describe('Rankings Model Unit Tests:', function () {
    beforeEach(function (done) {
        rankings = new Rankings({
            queue: 'mock rankings',
            entries: []
        });
        done();
    });

    describe('Testing the save method', function () {
        it('Should be able to save without problems', function (done) {
            rankings.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
    });

    describe('Test find method', function () {
        it('Should be able to find one and the create date should be the same', function (done) {
            rankings.save(function (saveErr) {
                saveDate = new Date();
                Rankings.findOne({queue: 'mock rankings'}, function (err, data) {
                    should.exist(data);
                    data.createDate.getSeconds().should.be.exactly(saveDate.getSeconds());
                    done();
                })
            });
        });
    });

    afterEach(function (done) {
        Rankings.remove(function () {
            done();
        });
    })
});

var app = require('../../app'),
    should = require('should'),
    mongoose = require('mongoose'),
    UserBasic = mongoose.model('UserBasic');

var userBasic;

describe('UserBasic Model Unit Tests:', function () {
    beforeEach(function (done) {
        userBasic = new UserBasic({
            name: 'mockUser',
            id: 1
        });
        done();
    });

    describe('Testing the save method', function () {
        it('Should be able to save without problems', function (done) {
            userBasic.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
        it('Should not be able to save an user without id',
            function (done) {
                userBasic.id = NaN;
                userBasic.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
    });

    describe('Test find method', function () {
        it('Should be able to find one', function (done) {
            userBasic.save(function (saveErr) {
                UserBasic.find({id: 1}, function (err, data) {
                    data.length.should.be.exactly(1);
                    done();
                })
            });
        });
    });

    afterEach(function (done) {
        UserBasic.remove(function () {
            done();
        });
    })
});

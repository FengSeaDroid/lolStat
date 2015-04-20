var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),
    UserBasic = require('mongoose').model('UserBasic');


describe('User api Unit Tests:', function () {

    describe('Test fetching user', function () {
        it('Should get a user', function (done) {
            request(app.app).get('/api/userBasic/hope')
                .expect(200)
                .end(function (err, res) {
                    res.body.id.should.be.exactly(41295889);
                    done();
                });
        });

        it('Should get 404', function (done) {
            request(app.app).get('/api/userBasic/hope1111')
                .expect(404)
                .end(function (err, res) {
                    res.body.should.eql({});
                    done();
                });
        });

        afterEach(function (done) {
            UserBasic.remove(function () {
                done();
            });
        })
    });


});

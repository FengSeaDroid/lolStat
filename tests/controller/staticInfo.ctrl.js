var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),

    mongoose = require('mongoose'),
    Map = mongoose.model('Map'),
    Champion = mongoose.model('Champion');


describe('StaticInfo api Unit Tests:', function () {

    describe('Test fetching staticInfo', function () {
        before(function (done) {
            new Map({mapName: 'mock1', mapId: '1'}).save(function (saveErr) {
                new Map({mapName: 'mock2', mapId: '2'}).save(function (err) {
                    new Champion({name: 'mock1', id: '1'}).save(function (err) {
                        new Champion({name: 'mock2', id: '2'}).save(function (err) {
                            done();
                        })
                    })
                })
            })
        });

        it('Should get maps', function (done) {
            request(app.app).get('/api/maps')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(2);
                    done();
                });
        });

        it('Should get champions', function (done) {
            request(app.app).get('/api/champions')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(2);
                    done();
                });
        });

        after(function (done) {
            Champion.remove(function () {
                Map.remove(function () {
                    done();
                });
            });
        })
    });
});

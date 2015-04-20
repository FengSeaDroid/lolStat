var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),

    Rankings = require('mongoose').model('Rankings');


describe('Rankings api Unit Tests:', function () {

    describe('Test fetching Rankings from riot api', function () {
        before(function (done) {
            Rankings.remove(function () {
                done();
            });
        });

        it('Should get rankings', function (done) {
            request(app.app).get('/api/rankings/RANKED_TEAM_5x5')
                .expect(200)
                .end(function (err, res) {
                    res.body.queue.should.be.eql('RANKED_TEAM_5x5');
                    res.body.entries.should.be.an.Array;
                    res.body.age.should.be.exactly(0);
                    done();
                });
        });

        after(function (done) {
            Rankings.remove(function () {
                done();
            });
        })
    });

    describe('Test updating old rankings', function () {
        before(function (done) {
            Rankings.remove(function () {
                new Rankings({
                    name: 'mockRanking',
                    queue: 'RANKED_TEAM_5x5',
                    createDate: new Date(2011, 11, 11)
                }).save(function (err) {
                        done();
                    });
            });
        });

        it('Should get new rankings', function (done) {
            request(app.app).get('/api/rankings/RANKED_TEAM_5x5')
                .expect(200)
                .end(function (err, res) {
                    res.body.queue.should.be.eql('RANKED_TEAM_5x5');
                    res.body.entries.should.be.an.Array;
                    res.body.name.should.not.eql('mockRanking');
                    new Date(res.body.createDate).getDay().should.eql(new Date().getDay());
                    res.body.age.should.be.exactly(0);
                    done();
                });
        });

        after(function (done) {
            Rankings.remove(function () {
                done();
            });
        })
    });
});

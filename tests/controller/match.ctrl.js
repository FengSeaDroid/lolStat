var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),

    Match = require('mongoose').model('Match');


describe('Match api Unit Tests:', function () {

    describe('Test fetching mock matches', function () {
        before(function (done) {
            new Match({
                matchId: 1,
                matchCreation: new Date(2011, 11, 11),
                matchMode: 'mock',
                participants: [{
                    teamId: 100,
                    championId: 1,
                    stats: {
                        winner: true,
                        champLevel: 1,
                        kills: 1
                    },
                    participantId: 1
                }],
                participantIdentities: [{
                    participantId: 1,
                    player: {
                        summonerId: 1,
                        summonerName: 'mock'
                    }
                }]
            }).save(function (err) {
                    new Match({
                        matchId: 2,
                        matchCreation: new Date(2011, 11, 11),
                        matchMode: 'mock',
                        participants: [{
                            teamId: 100,
                            championId: 1,
                            stats: {
                                winner: true,
                                champLevel: 1,
                                kills: 1
                            },
                            participantId: 1
                        }],
                        participantIdentities: [{
                            participantId: 1,
                            player: {
                                summonerId: 1,
                                summonerName: 'mock'
                            }
                        }]
                    }).save(function (err) {
                            new Match({
                                matchId: 3,
                                matchCreation: new Date(2011, 11, 11),
                                matchMode: 'mock',
                                participants: [{
                                    teamId: 100,
                                    championId: 1,
                                    stats: {
                                        winner: true,
                                        champLevel: 1,
                                        kills: 1
                                    },
                                    participantId: 1
                                }],
                                participantIdentities: [{
                                    participantId: 1,
                                    player: {
                                        summonerId: 1,
                                        summonerName: 'mock'
                                    }
                                }]
                            }).save(function (err) {
                                    new Match({
                                        matchId: 4,
                                        matchCreation: new Date(2011, 11, 11),
                                        matchMode: 'mock',
                                        participants: [{
                                            teamId: 100,
                                            championId: 1,
                                            stats: {
                                                winner: true,
                                                champLevel: 1,
                                                kills: 1
                                            },
                                            participantId: 1
                                        }],
                                        participantIdentities: [{
                                            participantId: 1,
                                            player: {
                                                summonerId: 1,
                                                summonerName: 'mock'
                                            }
                                        }]
                                    }).save(function (err) {
                                            new Match({
                                                matchId: 5,
                                                matchCreation: new Date(2011, 11, 11),
                                                matchMode: 'mock',
                                                participants: [{
                                                    teamId: 100,
                                                    championId: 1,
                                                    stats: {
                                                        winner: true,
                                                        champLevel: 1,
                                                        kills: 1
                                                    },
                                                    participantId: 1
                                                }],
                                                participantIdentities: [{
                                                    participantId: 1,
                                                    player: {
                                                        summonerId: 1,
                                                        summonerName: 'mock'
                                                    }
                                                }]
                                            }).save(function (err) {
                                                    done();
                                                });
                                        });
                                });
                        });
                });
        });

        it('Should get one match', function (done) {
            request(app.app).get('/api/match/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.matchId.should.be.exactly(1);
                    done();
                });
        });

        it('Should get all matches', function (done) {
            request(app.app).get('/api/matchHistory/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.an.Array.and.have.lengthOf(5);
                    new Date(res.body[2].matchCreation).getTime().should.eql((new Date(2011, 11, 11)).getTime());
                    done();
                });
        });

        after(function (done) {
            Match.remove(function () {
                done();
            });
        });
    });

    describe('Test updating matches', function () {
        this.timeout(7000);
        beforeEach(function (done) {
            new Match({
                matchId: 1798925425,
                matchCreation: new Date(2011, 11, 11),
                matchMode: 'mock',
                participants: [{
                    teamId: 100,
                    championId: 1,
                    stats: {
                        winner: true,
                        champLevel: 1,
                        kills: 1
                    },
                    participantId: 1
                }],
                participantIdentities: [{
                    participantId: 1,
                    player: {
                        summonerId: 41295889,
                        summonerName: 'hope'
                    }
                }]
            }).save(function (err) {
                    done()
                });
        });

        it('Should update matches', function (done) {
            request(app.app).get('/api/updateMatchHistory/41295889')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    Match.find({}, function (err, data) {
                        data.length.should.eql(5);
                        setTimeout(done,5000);
                    })
                });
        });

        it('Should update and show matches', function (done) {
            request(app.app).get('/api/matchHistory/41295889')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.length.should.eql(5);
                    setTimeout(done,5000);
                });
        });

        afterEach(function (done) {
            Match.remove(function () {
                done();
            });
        });

    });

});

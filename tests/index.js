var boot = require('../app.js').boot,
    shutdown = require('../app.js').shutdown,
    port = require('../app.js').port,
    request = require('superagent');
    expect = require('expect.js');

describe('server', function () {
    before(function () {
        boot();
    });
    describe('homepage', function () {
        it('should respond to GET', function (done) {
            request
                .get('http://localhost:' + port + '/api/userBasic?name=Ohhhq')
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    expect(res.body['ohhhq'].id).to.equal(42762376);
                    done()
                })
        });

    });
    after(function () {
        shutdown();
    });
});
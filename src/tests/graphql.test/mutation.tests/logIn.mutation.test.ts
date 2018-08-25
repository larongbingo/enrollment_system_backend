import { expect, request } from 'chai';
import { Server } from 'http';
import 'mocha';

import { Models } from '@database/index';

export function logInMutationTest(server: Server) {
  describe('LogIn Mutation Test', function() {
    before(function(done) {
      (async function() {
        await Models.Users.create({
          firstName: 'admin',
          middleName: 'admin',
          lastName: 'admin',
          username: 'admin',
          password: 'admin'
        });

        done();
      })();
    });

    it('POST /api?query=mutation{logIn(username: "admin", password: "admin")}', function(done) {
      (async function() {
        await request(server)
        .post('/api?query=mutation{logIn(username: "admin", password: "admin")}')
        .then(req => expect(req.body.data.logIn.success).to.be.equal(true));
        done();
      })();
    });

    it('Fail POST /api?query=mutation{logIn(username: "123", password: "123")}', function(done) {
      (async function() {
        await request(server)
        .post('/api?query=mutation{logIn(username: "123", password: "123")}')
        .then(req => expect(req.body.data.logIn.success).to.be.equal(false));
        done();
      })();
    });
  });
}

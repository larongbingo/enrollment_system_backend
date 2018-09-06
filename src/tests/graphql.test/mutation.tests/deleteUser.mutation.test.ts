import { expect, request } from 'chai';
import { inspect } from 'util';
import { Server } from 'http';
import 'mocha';

import { UserAttributes, Models } from '@database/index';

export function deleteUserMutationTest(server: Server) {
  describe('deleteUser.mutation test', function() {
    // Testing User Details
    const user: UserAttributes = {
      firstName: 'ASDASDASDASDASDASD',
      middleName: 'ASDSADASDASDASDADADADADASD',
      lastName: 'ASDASDASDASDASDASDASDASDASDASD',

      username: 'ASDASDASDASDASDASDASDASDASDASDASDASD',
      password: 'ADSASDASDASDASDASDASDASDASDADSASDASD'
    };

    let _token: string = '';
    before(function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{createUser(userDetails:${inspect(user).replace(/([\'])/g, '"')})}`);

        await request(server)
        .post(`/api?query=mutation{logIn(username:"${user.username}",password:"${user.password}")}`)
        .then(async (req) => { _token = req.body.data.logIn.data.token; })

        done();
      })();
    });

    it('delete a user', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{deleteUser(token:"${_token}")}`)
        .then(req => expect(req.body.data.deleteUser.success).to.be.equal(true))
        .then(() => done())
        .catch(done);
      })();
    });

    it('not delete a user if the user is already deleted', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{deleteUser(token:"${_token}")}`)
        .then(req => expect(req.body.data.deleteUser.success).to.be.equal(false))
        .then(() => done())
        .catch(done);
      })();
    });
    
    it('not delete a user if the token is invalid', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{deleteUser(token:"ASDASDASDASDASDASDASDASD")}`)
        .then(req => expect(req.body.data.deleteUser.success).to.be.equal(false))
        .then(() => done())
        .catch(done);
      })();
    });
    
    
  });
}
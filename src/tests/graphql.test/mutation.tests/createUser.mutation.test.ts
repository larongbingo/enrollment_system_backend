import { expect, request } from 'chai';
import { Server } from 'http';
import 'mocha';

import { UserAttributes, Models } from '@database/index';

export function createUserMutationTest(server: Server) {
  describe('createUser Mutation Test', function() {
    const tempUser: UserAttributes = {
      username: 'ASDF',
      password: 'ASDF',

      firstName: 'ASDF',
      middleName: 'ASDF',
      lastName: 'ASDF'
    };

    const requestString = `/api?query=mutation{createUser(username: "${tempUser.username}", password: "${tempUser.password}", firstName: "${tempUser.firstName}", middleName: "${tempUser.middleName}", lastName: "${tempUser.lastName}")}`;
  
    after(function(done) {
      (async function() {
        await Models.Users.destroy({ where: { username: tempUser.username } });
        done();
      })();
    });

    it('create a user', function(done) {
      (async function() {
        request(server)
        .post(requestString)
        .then(req => expect(req.body.data.createUser.success).to.be.equal(true));
        done();
      })();
    });


    it('fails to create a user with the username', function(done) {
      (async function() {
        request(server)
        .post(requestString)
        .then(req => expect(req.body.data.createUser.success).to.be.equal(false));
        done();
      })();
    });
  });
}

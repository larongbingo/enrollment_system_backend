import { expect, request } from 'chai';
import { Server } from 'http';
import 'mocha';

import { UserAttributes } from '@database/index';

export function updateMultipleUserDetailsMutationTest(server: Server) {
  describe('updateMultipleUserDetails Mutation Test', function() {
    const user: UserAttributes = {
      firstName: 'testUser',
      middleName: 'testUser',
      lastName: 'testUser',

      username: 'testUser',
      password: 'testUser'
    };

    // Add a user
    before(function(done) {
      (async function() {
        request(server)
        .post(`/api?query=mutation{createUser()}`)

        done();
      })();
    });

    beforeEach(function(done) {
      (async function() {
        done();
      })();
    });

    it('identify that the token is invalid', function(done) {
      (async function() {
        done();
      })();
    });

    it('updates the firstName, middleName, and lastName to "This is a test"', function(done) {
      (async function() {
        done();
      })();
    });

    it('can find the user when queried for their firstName, middleName, and lastName at User Query', function(done) {
      (async function() {
        done();
      })();
    });

    it('updates the username and password to "This is a test"', function(done) {
      (async function() {
        done();
      })();
    });

    it('recieves a proper token using "This is a test" for login', function(done) {
      (async function() {
        done();
      })();
    });
  });
}
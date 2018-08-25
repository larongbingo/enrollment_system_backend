import { expect } from 'chai';
import 'mocha';

import { createUser, UserAttributes, Models } from '@database/index';

export function createUserTest() {
  describe('createUser Test', function() {

    /**
     * Holds the temporary user details
     */
    let tempUser: UserAttributes = {
      firstName: 'ttest123',
      middleName: 'test123',
      lastName: 'test123',
      username: 'test123',
      password: 'test123'
    };

    after(function(done) {
      this.timeout(5000);
      this.slow(4000);

      (async function() {
        await Models.Users.destroy({ where: { username: tempUser.username } });
        done();
      })();
    });

    it('create a user', function(done) {
      this.timeout(5000);
      this.slow(4000);

      (async function() {
        await createUser(tempUser)
        .then(async user => await expect(user).to.be.not.null);

        done();
      })();
    });

    it('fail at creating a new user using the same user details', function(done) {
      this.timeout(5000);
      this.slow(4000);

      (async function() {
        await createUser(tempUser)
        .then(async user => await expect(user).to.be.null);

        done();
      })();
    });
  });
}
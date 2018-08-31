import 'mocha';

import { Models, UserAttributes } from '@database/index';
import { generateFakeUsers } from '@lib';

export function storageTests() {
  describe('Storage Tests', function() {
    describe('Users Model', function() {
      it('stores 20 randomly generated user details', function(done) {
        this.timeout(20000);
        this.slow(17000);

        const customGenerateFakeUsers = async () => {
          await generateFakeUsers(20, false);
        }

        (async () => {
          await customGenerateFakeUsers();
          done();
        })();
      });
      
      it('should throw an error for usernames that have been taken', function(done) {
        const testAccount: UserAttributes = {
          firstName: 'This is a tet',
          middleName: 'ASDASDASDASD',
          lastName: 'ASDASDASDASDASD',

          username: 'aasdasdasdasdasdasdasdasdasdasd',
          password: 'asdasdasdasdasdasdasdasdasdasdasd'
        };
        
        (async function() {
          await Models.Users.create(testAccount)
          .then(async () => await Models.Users.create(testAccount))
          .then(() => done('Model did not throw an error'))
          .catch(() => done());
        })();
      });

      it('deletes all entries in the database', function(done) {
        this.timeout(60000);
        this.slow(17000);

        const deleteAllUsers = async () => {
          await Models.Users.all()
          .then(async users => {
            let promises: any[] = [];

            users.forEach(user => {
              let temp = new Promise((res, rej) => {
                res(user.destroy());
              });

              promises.push(temp);
            });

            return await Promise.all(promises);
          })
        };

        (async () => {
          await deleteAllUsers();
          done();
        })();
      });
    });
  });
}
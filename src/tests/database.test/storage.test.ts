import 'mocha';

import { Models } from '@database/index';
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
      
      // Not all Promises are completed before running done()
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
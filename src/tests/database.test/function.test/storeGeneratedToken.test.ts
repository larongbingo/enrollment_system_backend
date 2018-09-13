import { expect } from 'chai';
import 'mocha';

import { Models, storeGeneratedToken } from '@database/index';
import { generateFakeUsers } from '@lib';

export function storeGeneratedTokenTest() {
  describe('storeGeneratedToken Tests', function() {
    before(function(done) {
      this.timeout(20000);
      this.slow(17000);
  
      (async function() {
        await generateFakeUsers(10, false)
        .then(() => done())
        .catch(done);
      })();
    });
    
    after(function(done) {
      this.timeout(30000);
      this.slow(27000);
  
      (async function() {
        await Models.Users.all()
        .then(async users => await users.forEach(async user => await user.destroy()));
  
        done();
      })();
    });
  
    it('atleast 5 user details be stored to database', function(done) {
      this.timeout(8000);
      this.slow(6000);

      (async function() {
        await Models.Users.all()
        .then(async users => await users.forEach(async user => await storeGeneratedToken(user)))
        
        await Models.Tokens.all()
        .then(tokens => expect(tokens.length).is.greaterThan(4));
  
        done();
      })();
    });
  });
}
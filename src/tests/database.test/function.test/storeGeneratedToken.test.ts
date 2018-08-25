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
        await generateFakeUsers(20, false);
        done();
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
  
    it('all 20 user details be stored to database', function(done) {
      this.timeout(5000);
      this.slow(4000);

      (async function() {
        await Models.Users.all()
        .then(async users => await users.forEach(async user => await storeGeneratedToken(user)))
        
        await Models.Tokens.all()
        .then(tokens => expect(tokens.length).is.equal(20));
  
        done();
      })();
    });
  });
}
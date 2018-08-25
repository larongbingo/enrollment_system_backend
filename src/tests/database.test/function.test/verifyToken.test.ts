import { expect } from 'chai';
import 'mocha';

import { Models, storeGeneratedToken, UserAttributes, verifyToken } from '@database/index';

export function verifyTokenTest() {
  describe('verifyToken Tests', function() {
    let _token = "";
  
    before(function(done) {
      this.timeout(5000);
      this.slow(3000);
  
      (async function() {
        const admin: UserAttributes = {
          username: 'admin', 
          password: 'admin', 
          firstName: 'admin', 
          middleName: 'admin', 
          lastName: 'admin'
        };
  
        await Models.Users.create(admin)
        .then(async user => await storeGeneratedToken(user))
        .then(async token => _token = token);
  
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
  
    it('verify a valid token', function(done) {
      (async function() {
        await verifyToken(_token)
        .then(res => expect(res).to.be.not.null);
  
        done();
      })();
    });

    it('fail at verifying an invalid token', function(done) {
      (async function() {
        await verifyToken('123')
        .then(res => expect(res).to.be.null);
        
        done();
      })();
    })
  });
}
import { expect } from 'chai';
import 'mocha';

import { UserAttributes, Models, logIn } from '@database/index';

export function logInTest() {
  describe('logIn Tests', function() {

    // Create an admin account where all values are set to 'admin'
    before(function(done) {
      (async function() {
        const admin: UserAttributes = {
          username: 'admin', 
          password: 'admin', 
          firstName: 'admin', 
          middleName: 'admin', 
          lastName: 'admin'
        };
  
        await Models.Users.create(admin);
  
        done();
      })();
    });
  
    after(function(done) {
      (async function() {
        await Models.Users.destroy({ where: { firstName: 'admin' } });
        done();
      })();
    })
  
    it('LogIn using a single account', function(done) {
      (async function() {
        await logIn('admin', 'admin')
        .then(token => expect(token).is.not.equal(null))
        .catch((err) => console.log(err));
  
        done();
      })();
    });
    
  
    // Attempt a login using any random credentials
    it('Fail a login', function(done) {
      (async function() {
        await logIn('123', '123')
        .then(token => expect(token).is.equal(null))
        .catch((err) => console.log(err));
  
        done();
      })();
    });
  
  });
}
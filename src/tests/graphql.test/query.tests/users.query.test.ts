import { expect, request } from 'chai';
import { Server } from 'http';
import 'mocha';

import { generateFakeUsers } from '@lib';

export function userQueryTest(server: Server) {
  describe('Users Query Test', function() {
    // Generate Random Data
    before(function(done) {
      this.timeout(10000);
      this.slow(7000);

      (async function() {
        await generateFakeUsers(10, false);
        done();
      })();
    });
    
    it('GET /api?query={Users{id firstName middleName lastName}}', function(done) {
      this.timeout(5000);
      this.slow(3000);

      (async function() {
        await request(server)
        .get('/api?query={Users{id firstName middleName lastName}}')
        .then(req => expect(req.body.data.Users.length).to.be.equal(10));
        
        done();
      })();
    });
    
  });
}
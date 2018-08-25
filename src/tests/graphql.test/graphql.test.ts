import { expect, request } from 'chai';
import { Server } from 'http';
import 'mocha';

import { ExpressApp } from '@server';

import { mutationTests } from './mutation.tests';
import { queryTests } from './query.tests';

export function graphqlTest() {

  describe('GraphQL Tests', function() {

    /**
     * Holds the instance of the server
     */
    let server: Server = ExpressApp.listen(3000);

    /**
     * After the tests, destroy the process of the server
     */
    after(function(done) {
      (async function() {
        await server.close();
        done();
      })();
    });
  
    it('GET /', function(done) {
      (async function() {
        await request(server)
        .get('/')
        .then(req => expect(req.status).to.be.equal(200));

        done();
      })();
    });

    queryTests(server);

    mutationTests(server);

  });

}
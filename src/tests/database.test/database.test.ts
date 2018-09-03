import 'mocha';

import { sequelize } from '@database/index';

import { storageTests } from './storage.test';
import { functionTests } from './function.test';
import { queryTest } from './query.test';
import { Server } from 'http';

export function databaseTest(server: Server) {
  describe('Database Tests', function() {
    it('test connection with the MySQL Client', function(done) {
      this.timeout(5000);
      this.slow(2500);
      
      (async function() {
        await sequelize.authenticate();
        done();
      })();
    });

    it('reset the MySQL Tables', function(done) {
      this.timeout(5000);
      this.slow(4000);

      (async function() {
        await sequelize.sync({ force: true });
        done();
      })();
    })

    storageTests();
    queryTest(server);
    functionTests();
  });
} 
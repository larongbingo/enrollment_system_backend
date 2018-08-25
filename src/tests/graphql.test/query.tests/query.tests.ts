import { Server } from 'http';
import 'mocha';

import { userQueryTest } from './users.query.test';

export function queryTests(server: Server) {
  describe('Query Tests', function() {
    userQueryTest(server);
  });
}
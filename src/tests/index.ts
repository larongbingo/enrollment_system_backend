import 'dotenv/config';

import chaiHTTP from 'chai-http';
import { Server } from 'http';
import { use } from 'chai';
import 'mocha';

import { ExpressApp } from '@server';

// Set up chai-http
use(chaiHTTP);

/**
 * Holds the instance of the server
 */
let server: Server = ExpressApp.listen(3000);

import { databaseTest } from './database.test';
import { graphqlTest } from './graphql.test';

describe('Tests', () => {
  databaseTest(server);
  graphqlTest(server);
});
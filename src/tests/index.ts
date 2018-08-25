import 'dotenv/config';

import chaiHTTP from 'chai-http';
import { use } from 'chai';
import 'mocha';

// Set up chai-http
use(chaiHTTP);

import { databaseTest } from './database.test';
import { graphqlTest } from './graphql.test';

describe('Tests', () => {
  databaseTest();
  graphqlTest();
});
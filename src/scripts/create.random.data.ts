/**
 * create.random.data.ts
 * Generates random data for testing purposes
 */

// Loads environment variables
import 'dotenv/config';

import { sequelize } from '@database/index';
import { generateFakeUsers } from '@lib';


sequelize.sync({ force: true })
  .then(() => generateFakeUsers(100))
  .then(() => process.exit(0));

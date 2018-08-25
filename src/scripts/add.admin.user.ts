import 'dotenv/config';

import { Models, UserAttributes } from '@database/index';

const admin: UserAttributes = {
  firstName: 'admin',
  middleName: 'admin',
  lastName: 'admin',

  username: 'admin',
  password: 'admin'
};

console.log('Adding admin user');

Models.Users.create(admin)
.then(() => process.exit(0));
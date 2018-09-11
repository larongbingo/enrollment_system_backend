import 'dotenv/config';

import { sequelize } from '@database/index';

console.log('Updating MySQL Client with the current Models');

if(process.env.NODE_ENV === 'production') {
  console.log('Environment is in "production", this WILL DELETE existing user data');
  process.exit(1);
}

sequelize.sync({ force: true })
.then(() => process.exit(0));
import 'dotenv/config';

import { sequelize } from '@database/index';

console.log('Updating MySQL Client with the current Models');

sequelize.sync({ force: true })
.then(() => process.exit(0));
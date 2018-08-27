import Sequelize from 'sequelize';

import { UserModelFactory, TokenModelFactory } from './models';

/**
 * Holds the MySQL Client info to connect
 */
const MYSQL_DATABASE_CONN_INFO = {
  DATABASE_NAME: process.env.MYSQL_DATABASE_NAME || '',
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || '',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || ''
};

export const sequelize = new Sequelize(
  MYSQL_DATABASE_CONN_INFO.DATABASE_NAME, 
  MYSQL_DATABASE_CONN_INFO.MYSQL_USERNAME, 
  MYSQL_DATABASE_CONN_INFO.MYSQL_PASSWORD, 
  {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'testing' ? false : true,
    host: process.env.MYSQL_HOST ? process.env.MYSQL_HOST : '127.0.0.1'
  }
);

export const Models = {
  Users: UserModelFactory(sequelize),
  Tokens: TokenModelFactory(sequelize)
};

export default {
  sequelize,
  Models
};
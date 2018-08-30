import { Sequelize, DefineOptions, DefineAttributes, UUID, STRING, BOOLEAN } from 'sequelize';

import { LogInstance, LogAttributes } from './logs.types';

export function LogsModelFactory(sequelize: Sequelize) {
  const attributes: DefineAttributes = {
    user: {
      type: UUID,
      allowNull: true
    },
    message: {
      type: STRING,
      allowNull: true
    },
    graphql_endpoint: {
      type: STRING
    },
    graphql_arguments: {
      type: STRING,
      allowNull: true
    },
    request_status: {
      type: BOOLEAN,
      allowNull: true
    }
  };

  const options: DefineOptions<LogInstance> = { };

  const LogsModelName: string = 'logs';

  return sequelize.define<LogInstance, LogAttributes>
  (LogsModelName, attributes, options);
}
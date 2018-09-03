import { Sequelize, DefineOptions, DefineAttributes, UUID, STRING, BOOLEAN, TEXT } from 'sequelize';

import { LogInstance, LogAttributes } from './logs.types';

export function LogsModelFactory(sequelize: Sequelize) {
  const attributes: DefineAttributes = {
    user: {
      type: UUID,
      allowNull: true
    },
    message: {
      type: TEXT('long'),
      allowNull: true
    },
    graphql_endpoint: {
      type: STRING
    },
    graphql_arguments: {
      type: TEXT('long'),
      allowNull: true
    },
    request_status: {
      type: BOOLEAN,
      allowNull: true
    }
  };

  const options: DefineOptions<LogInstance> = {
    paranoid: true
  };

  const LogsModelName: string = 'logs';

  return sequelize.define<LogInstance, LogAttributes>
  (LogsModelName, attributes, options);
}
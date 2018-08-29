import { Sequelize, DefineOptions, DefineAttributes, UUID, STRING, BOOLEAN } from 'sequelize';

import { LogInstance, LogAttributes } from './logs.types';

export function LogsModelFactory(sequelize: Sequelize) {
  const attributes: DefineAttributes = {
    user: {
      type: UUID
    },
    message: {
      type: STRING
    },
    graphql_endpoint: {
      type: STRING
    },
    request_status: {
      type: BOOLEAN
    }
  };

  const options: DefineOptions<LogInstance> = { };

  const LogsModelName: string = 'logs';

  return sequelize.define<LogInstance, LogAttributes>
  (LogsModelName, attributes, options);
}
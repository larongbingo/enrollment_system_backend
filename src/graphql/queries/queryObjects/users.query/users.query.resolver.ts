import { GraphQLFieldResolver } from 'graphql';

import { UserAttributes, Models, LogAttributes } from '@database/index';
import { likeQueryCreator } from '@graphql/util';

export const userQueryResolver: GraphQLFieldResolver<UserAttributes, void, UserAttributes> = 
  (source, args) => {
    let logEntry: LogAttributes = {
      graphql_endpoint: 'users.query',
      graphql_arguments: JSON.stringify(args)
    };

    logEntry.message = "User Query Successful";
    logEntry.request_status = true;

    return Models.Users.findAll({ where: likeQueryCreator(args, [ 'firstName', 'middleName', 'lastName' ]) })
    .then(async (users) => { await Models.Logs.create(logEntry); return users; })
    .catch(async err => {
      console.log(err);

      logEntry.message = JSON.stringify(err);
      logEntry.request_status = true;

      return await Models.Logs.create(logEntry)
      .then(() => []);
    })
  }
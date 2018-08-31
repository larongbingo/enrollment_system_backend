import { GraphQLFieldResolver } from 'graphql';

import { UserAttributes, Models, LogAttributes, UserTypes } from '@database/index';

export const userQueryResolver: GraphQLFieldResolver<UserAttributes, void> = 
  (source, args) => {
    let logEntry: LogAttributes = {
      graphql_endpoint: 'users.query',
      graphql_arguments: JSON.stringify(args)
    };

    logEntry.message = "User Query Successful";
    logEntry.request_status = true;

    return Models.Users.findAll({ where: args })
    .then(async (users) => { await Models.Logs.create(logEntry); return users; })
    .catch(async err => {
      console.log(err);

      logEntry.message = JSON.stringify(err);
      logEntry.request_status = true;

      return await Models.Logs.create(logEntry)
      .then(() => []);
    })
  }
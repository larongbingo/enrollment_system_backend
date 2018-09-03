import { GraphQLFieldResolver } from 'graphql';

import { createUser, Models, LogAttributes } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';

import { NewUserDetails } from './createUser.mutation.types';

/**
 * Handles the data passed by the user to create an account
 * @param source GraphQL Param
 * @param args Data passed by the user
 */
export const createUserMutationResolver: GraphQLFieldResolver<void, void, NewUserDetails> =
  (source, args) => {
    let logEntry: LogAttributes = {
      graphql_endpoint: "createUserMutation",
      graphql_arguments: JSON.stringify(args)
    };

    return createUser(args.userDetails)
    .then(async user => {
      if(!user) {
        logEntry.message = "Username already taken";
        logEntry.request_status = false;

        return await Models.Logs.create(logEntry)
        .then(() => new FailedRequest('Username already taken'))
      }

      logEntry.request_status = true;
      logEntry.message = "New user created: id=" + user.id;
      logEntry.user = user.id;

      return await Models.Logs.create(logEntry)
      .then(() => new SuccessfulRequest({ id: user.id })); 
    })
    .catch(async err => {
      console.log(err);

      logEntry.request_status = false;
      logEntry.message = JSON.stringify(err);

      return await Models.Logs.create(logEntry)
      .then(() => new FailedRequest('Error occured during the creation of the user, please try again.'));
    });
  }
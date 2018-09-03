import { GraphQLFieldResolver } from 'graphql';

import { LogInCredentials } from './login.mutation.types';
import { logIn, storeGeneratedToken, Models, LogAttributes } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';

/**
 * Resolver of the log in mutation; returns a token to all successfull logins
 * @param source GraphQL Parameter
 * @param args Data from the user
 */
export const loginMutationResolver: GraphQLFieldResolver<void, void, LogInCredentials> =
  (source, args) => {
    let logEntry: LogAttributes = {
      graphql_endpoint: "logInMutation",
      graphql_arguments: JSON.stringify(args)
    };

    return logIn(args.username, args.password)
      .then(async res => {
        if(!res) {
          logEntry.request_status = false;
          logEntry.message = "Log In attempt failed";

          return await Models.Logs.create(logEntry)
          .then(() => new FailedRequest('No such account found'));
        }

        logEntry.request_status = true;
        logEntry.message = "Log In attempt success";
        logEntry.user = res.id;

        return await Models.Logs.create(logEntry)
        .then(async () => new SuccessfulRequest({
          token: await storeGeneratedToken(res!)
        }));
      })
      .catch(err => {
        console.log(err);

        logEntry.request_status = false;
        logEntry.message = JSON.stringify(err);

        return Models.Logs.create(logEntry)
        .then(() => new FailedRequest('Error occurred during login request processing, please try again.'));
      });
  }
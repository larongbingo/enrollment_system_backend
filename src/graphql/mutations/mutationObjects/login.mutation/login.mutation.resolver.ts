import { GraphQLFieldResolver } from 'graphql';

import { LogInCredentials } from './login.mutation.types';
import { logIn, storeGeneratedToken } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';

/**
 * Resolver of the log in mutation; returns a token to all successfull logins
 * @param source GraphQL Parameter
 * @param args Data from the user
 */
export const loginMutationResolver: GraphQLFieldResolver<void, void, LogInCredentials> =
  (source, args) => {
    return logIn(args.username, args.password)
      .then(async res => {
        if(!res) {
          return new FailedRequest('No such account found');
        }

        return await new SuccessfulRequest({
          token: await storeGeneratedToken(res!)
        });
      })
      .catch(err => {
        console.log(err);
        return new FailedRequest('Error occurred during login request processing, please try again.');
      });
  }
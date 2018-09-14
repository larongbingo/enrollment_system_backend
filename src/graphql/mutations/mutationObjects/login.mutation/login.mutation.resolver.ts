import { GraphQLFieldResolver } from 'graphql';

import { logIn, storeGeneratedToken, verifyToken, TokenTypes } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';
import { FailedRequestLogging, SuccessfulRequestLogging } from '@graphql/util';

import { LogInCredentials } from './login.mutation.types';

/**
 * Resolver of the log in mutation; returns a token to all successfull logins
 * @param source GraphQL Parameter
 * @param args Data from the user
 */
export const loginMutationResolver: GraphQLFieldResolver<void, void, LogInCredentials> =
  (source, args) => {
    const ENDPOINT_NAME = 'logInMutation';

    // TODO: Remove exclamation point after development
    return verifyToken(args.CSRF_Token!)
      .then(async (token) => {
        if(!token) {
          return await FailedRequestLogging(args, ENDPOINT_NAME, 'Invalid Token')
          .then(() => new FailedRequest('Invalid Token'));
        }

        await token.destroy();

        return logIn(args.username, args.password)
        .then(async res => {
          if(!res) {
            return await FailedRequestLogging(args, ENDPOINT_NAME, 'Log In failed')
            .then(() => new FailedRequest('No such account found'));
          }
  
          return await SuccessfulRequestLogging(args, ENDPOINT_NAME, 'Log In success', res.id)
          .then(async () => new SuccessfulRequest({
            token: await storeGeneratedToken(res!)
          }));
        });
      })
      .catch(err => {
        console.log(err);

        try {
          FailedRequestLogging(args, ENDPOINT_NAME, JSON.stringify(err))
        }
        catch(e) {
          console.log(e);
        }

        return new FailedRequest('Error occurred during login request processing, please try again.');
      });
  }
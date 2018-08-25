import { GraphQLFieldResolver } from 'graphql';

import { UserAttributes, createUser } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';

import { NewUserDetails } from './createUser.mutation.types';

/**
 * Handles the data passed by the user to create an account
 * @param source GraphQL Param
 * @param args Data passed by the user
 */
export const createUserMutationResolver: GraphQLFieldResolver<void, void, NewUserDetails> =
  (source, args) => {
    return createUser(args.userDetails)
    .then(async user => {
      if(!user) return new FailedRequest('Username already taken');

      return new SuccessfulRequest({ id: user.id });
    })
    .catch(err => {
      console.log(err);
      return new FailedRequest('Error occured during the creation of the user, please try again.')
    });
  }
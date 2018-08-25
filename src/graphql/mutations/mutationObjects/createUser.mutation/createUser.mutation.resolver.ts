import { GraphQLFieldResolver } from 'graphql';

import { UserAttributes, createUser } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';

export const createUserMutationResolver: GraphQLFieldResolver<void, void, UserAttributes> =
  (source, args) => {
    return createUser(args)
    .then(async user => {
      if(!user) return new FailedRequest('Username already taken');

      return new SuccessfulRequest({ id: user.id });
    })
    .catch(err => new FailedRequest('Error occured during the creation of the user, please try again.'));
  }
import { GraphQLFieldResolver } from 'graphql';

import { verifyToken, Models } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';

import { TokenStorage } from './deleteUser.mutation.types';

export const deleteUserMutationResolver: GraphQLFieldResolver<void, void, TokenStorage> =
(source, args) => {
  return verifyToken(args.token)
  .then(async token => {
    if(!token) {
      return new FailedRequest('Token is not valid');
    }

    return await Models.Users.findOne({ where: { id: token.userId } })
    .then(async user => {
      if(!user) {
        return new FailedRequest('User does not exist');
      }

      await user.destroy();

      return new SuccessfulRequest({ deletedUser: { id: user.id } });
    })
  })
}
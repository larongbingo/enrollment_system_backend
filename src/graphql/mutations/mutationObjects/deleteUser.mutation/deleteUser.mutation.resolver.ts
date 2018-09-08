import { GraphQLFieldResolver } from 'graphql';

import { verifyToken, Models } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';
import { SuccessfulRequestLogging, FailedRequestLogging } from '@graphql/util';

import { TokenStorage } from './deleteUser.mutation.types';

export const deleteUserMutationResolver: GraphQLFieldResolver<void, void, TokenStorage> =
(source, args) => {
  const ENDPOINT_NAME = 'deleteUser.mutation';

  return verifyToken(args.token)
  .then(async token => {
    if(!token) {
      return await FailedRequestLogging(args, ENDPOINT_NAME, 'Invalid token')
      .then(() => new FailedRequest('Token is not valid'));
    }

    return await Models.Users.findOne({ where: { id: token.userId } })
    .then(async user => {
      if(!user) {
        return await FailedRequestLogging(args, ENDPOINT_NAME, 'User does not exist')
        .then(() => new FailedRequest('User does not exist'));
      }

      await user.destroy();

      return SuccessfulRequestLogging(args, ENDPOINT_NAME, 'Deleted id=' + user.id)
      .then(() => new SuccessfulRequest({ deletedUser: { id: user.id } }));
    })
  })
}
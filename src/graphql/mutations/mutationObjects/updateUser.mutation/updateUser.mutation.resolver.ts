import { GraphQLFieldResolver } from 'graphql';

import { Models, verifyToken } from '@database/index';
import { SuccessfulRequest, FailedRequest } from '@graphql/types';

import { UpdateUser } from './updateUser.mutation.types';

/**
 * Note:
 * This endpoint has been deprecated due to it having no capability of updating
 * multiple details in a single request.
 * 
 * Please use this: @graphql/mutations/updateMultipleUserDetails.mutation 
 */
export const updateUserMutationResolver: GraphQLFieldResolver<void, void, UpdateUser> =
  (source, args) => {
    return verifyToken(args.token)
    .then(async token => {
      if(!token) return new FailedRequest('Token is not valid');

      return await Models.Users.findOne({ where: { id: token.userId } })
      .then(async user => {
        if(!user) return new FailedRequest('User does not exist');

        user[args.field] = args.newValue;
        
        // Save the changes and destroy the token
        return await user.save()
        .then(async () => await token.destroy())
        .then(async () =>  new SuccessfulRequest(`${args.field} updated to "${args.newValue}", please login again.`));
      })
    })
    .catch(err => {
      console.log(err);
      return new FailedRequest('Error occurred during the update of the user, please try again')
    });
  }

export const updateUserMutationDeprecatedResolver: GraphQLFieldResolver<void, void, UpdateUser> = 
  () => new FailedRequest('This Mutation has been deprecated, please use updateMultipleUserDetails');
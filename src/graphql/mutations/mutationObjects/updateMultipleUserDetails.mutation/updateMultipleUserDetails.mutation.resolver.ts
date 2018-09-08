import { GraphQLFieldResolver } from 'graphql';

import { verifyToken, Models, LogAttributes } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';
import { FailedRequestLogging, SuccessfulRequestLogging } from '@graphql/util';

import { UserDetails } from './updateMultipleUserDetails.mutation.types';

export const updateMultipleUserDetailsMutationResolver:
  GraphQLFieldResolver<void, void, UserDetails> = 
    (root, args) => {
      const ENDPOINT_NAME = 'updateMultipleUserDetails.mutation';

      return verifyToken(args.token)
      .then(async token => {
        if(!token) {
          return await FailedRequestLogging(args, ENDPOINT_NAME, 'Invalid Token')
          .then(() => new FailedRequest('Token is not valid'));
        }

        return Models.Users.findOne({ where: { id: token.userId } })
        .then(async user => {
          if(!user) {
            return await FailedRequestLogging(args, ENDPOINT_NAME, 'User does not exist')
            .then(() => new FailedRequest('User does not exist'));
          }

          // Update the user with the args.update
          await Object.keys(args.update).forEach(key => user[key] = args.update[key]);

          return await user.save()
          .then(async () => await token.destroy())
          .then(async () => SuccessfulRequestLogging(args, ENDPOINT_NAME, 'Updated user=' + user.id))    
          .then(() => new SuccessfulRequest({updatedDetails: args.update}));
        });
      })
      .catch(async err => {
        console.log(err);

        return await FailedRequestLogging(args, ENDPOINT_NAME, JSON.stringify(err))
        .then(() => new FailedRequest('Error occurred during the update of the user, please try again'));
      });
    };
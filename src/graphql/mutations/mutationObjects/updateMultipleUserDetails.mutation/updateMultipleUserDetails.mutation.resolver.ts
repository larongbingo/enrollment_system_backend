import { GraphQLFieldResolver } from 'graphql';

import { verifyToken, Models } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';

import { UserDetails } from './updateMultipleUserDetails.mutation.types';

export const updateMultipleUserDetailsMutationResolver:
  GraphQLFieldResolver<void, void, UserDetails> = 
    (root, args) => {
      return verifyToken(args.token)
      .then(async token => {
        if(!token) return new FailedRequest('Token is not valid');

        return Models.Users.findOne({ where: { id: token.userId } })
        .then(async user => {
          if(!user) return new FailedRequest('User does not exist');

          // Update the user with the args.update
          await Object.keys(args.update).forEach(key => user[key] = args.update[key]);

          return await user.save()
          .then(async () => await token.destroy())
          .then(async () => new SuccessfulRequest({updateDetails: args.update}));
        });
      })
      .catch(err => {
        console.log(err);
        return new FailedRequest('Error occurred during the update of the user, please try again');
      });
    };
import { GraphQLFieldResolver } from 'graphql';

import { verifyToken, Models, LogAttributes } from '@database/index';
import { FailedRequest, SuccessfulRequest } from '@graphql/types';

import { UserDetails } from './updateMultipleUserDetails.mutation.types';

export const updateMultipleUserDetailsMutationResolver:
  GraphQLFieldResolver<void, void, UserDetails> = 
    (root, args) => {
      let logEntry: LogAttributes = {
        graphql_endpoint: "updateMultipleUserDetails.Mutation",
        graphql_arguments: JSON.stringify(args)
      };

      return verifyToken(args.token)
      .then(async token => {
        if(!token) {
          logEntry.message = "Token is not valid";
          logEntry.request_status = false;

          return await Models.Logs.create(logEntry)
          .then(() => new FailedRequest('Token is not valid'));
        }

        return Models.Users.findOne({ where: { id: token.userId } })
        .then(async user => {
          if(!user) {
            logEntry.message = "User does not exist"
            logEntry.request_status = false;

            return await Models.Logs.create(logEntry)
            .then(() => new FailedRequest('User does not exist'));
          }

          // Update the user with the args.update
          await Object.keys(args.update).forEach(key => user[key] = args.update[key]);

          logEntry.message = "Successfully updated the user id=" + user.id;
          logEntry.request_status = true;
          logEntry.user = user.id;

          return await Models.Logs.create(logEntry)
          .then(async () => await user.save())
          .then(async () => await token.destroy())
          .then(async () => new SuccessfulRequest({updatedDetails: args.update}));
        });
      })
      .catch(async err => {
        console.log(err);

        logEntry.message = JSON.stringify(err);
        logEntry.request_status = false;

        return await Models.Logs.create(logEntry)
        .then(() => new FailedRequest('Error occurred during the update of the user, please try again'));
      });
    };
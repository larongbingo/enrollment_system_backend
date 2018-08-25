import { GraphQLObjectType } from 'graphql';

import { logInMutation, updatedCreateUserMutation, updateUserMutation, updateMultipleUserDetails } from './mutationObjects';

export const rootMutationObject = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Commonly used for POST Requests; used to update any data',
  fields: {
    logIn: logInMutation,
    createUser: updatedCreateUserMutation,
    updateUser: updateUserMutation,
    updateMultipleUserDetails: updateMultipleUserDetails
  }
});

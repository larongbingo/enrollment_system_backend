import { GraphQLObjectType } from 'graphql';

import { logInMutation, createUserMutation, updateUserMutation, updateMultipleUserDetails } from './mutationObjects';

export const rootMutationObject = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Commonly used for POST Requests; used to update any data',
  fields: {
    logIn: logInMutation,
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    updateMultipleUserDetails: updateMultipleUserDetails
  }
});

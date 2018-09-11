import { GraphQLObjectType } from 'graphql';

import { logInMutation, updatedCreateUserMutation, updateUserDetail, deleteUserMutation } from './mutationObjects';

export const rootMutationObject = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Commonly used for POST Requests; used to update any data',
  fields: {
    logIn: logInMutation,
    createUser: updatedCreateUserMutation,
    updateUser: updateUserDetail,
    deleteUser: deleteUserMutation
  }
});

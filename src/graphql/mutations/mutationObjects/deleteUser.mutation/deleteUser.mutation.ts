import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { deleteUserMutationResolver } from './deleteUser.mutation.resolver';

export const deleteUserMutation: GraphQLFieldConfig<void, void, any> = {
  description: 'Deletes a user if a token is passed',
  type: GraphQLJSON,
  args: {
    token: {
      type: GraphQLString,
      description: 'The token of the user'
    }
  },
  resolve: deleteUserMutationResolver
};
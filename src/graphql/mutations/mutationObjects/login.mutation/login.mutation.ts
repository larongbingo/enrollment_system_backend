import { GraphQLFieldConfig, GraphQLString, GraphQLNonNull } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { loginMutationResolver } from './login.mutation.resolver';

export const logInMutation: GraphQLFieldConfig<void, void, any> = {
  description: 'Handles log in requests; requires the username and password',
  type: GraphQLJSON,
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the user'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user'
    }
  },
  resolve: loginMutationResolver
};
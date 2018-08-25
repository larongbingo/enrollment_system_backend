import { GraphQLFieldConfig, GraphQLString, GraphQLNonNull } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { createUserMutationResolver } from './createUser.mutation.resolver';

export const createUserMutation: GraphQLFieldConfig<void, void, any> = {
  description: 'Creates a new user using the information required by the mutation',
  type: GraphQLJSON,
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The firstname of the user'
    },
    middleName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The middlename of the user'
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The lastname of the user'
    },
    address: {
      type: GraphQLString,
      description: 'The address of the user'
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the user'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user'
    }
  },
  resolve: createUserMutationResolver
};
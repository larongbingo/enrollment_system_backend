import { GraphQLFieldConfig, GraphQLString, GraphQLNonNull } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { createUserMutationResolver } from './createUser.mutation.resolver';
import { RequiredValidFieldsType } from './createUser.mutation.types';

export const updatedCreateUserMutation: GraphQLFieldConfig<void, void, any> = {
  description: 'Creates a new user using the information required by the mutation',
  type: GraphQLJSON,
  args: {
    userDetails: {
      type: new GraphQLNonNull(RequiredValidFieldsType),
      description: 'Holds all of the details to create the user'
    }
  },
  resolve: createUserMutationResolver
};
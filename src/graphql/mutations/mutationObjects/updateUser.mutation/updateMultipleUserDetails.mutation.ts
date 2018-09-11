import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { updateMultipleUserDetailsMutationResolver } from './updateMultipleUserDetails.mutation.resolver';
import { ValidFieldsType } from './updateMultipleUserDetails.mutation.types';

export const updateUserDetail: GraphQLFieldConfig<void, void, any> = {
  description: 'Takes in a JSON Object and uses that to update the details of the user',
  type: GraphQLJSON,
  args: {
    update: {
      type: new GraphQLNonNull(ValidFieldsType),
      description: 'The new values that will be used to update the user'
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The session token of the user'
    }
  },
  resolve: updateMultipleUserDetailsMutationResolver
};
import { GraphQLFieldConfig, GraphQLEnumType, GraphQLNonNull, GraphQLString } from 'graphql';
import GraphQLJSON from 'graphql-type-json';

import { fieldGraphQLEnum } from './updateUser.mutation.types';
import { updateUserMutationDeprecatedResolver } from './updateUser.mutation.resolver';

/**
 * Note:
 * This endpoint has been deprecated due to it having no capability of updating
 * multiple details in a single request.
 * 
 * Please use this: @graphql/mutations/updateMultipleUserDetails.mutation 
 */
export const updateUserMutation: GraphQLFieldConfig<void, void, any> = {
  description: 'Updates the given field with the new given value',
  deprecationReason: 'Updated to updateMultipleUserDetails',
  type: GraphQLJSON,
  args: {
    field: {
      type: new GraphQLNonNull(new GraphQLEnumType({ name: 'Fields', values: fieldGraphQLEnum })),
      description: 'The field that needs to be updated'
    },
    newValue: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The new value of the specified field'
    },
    token: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The session token of the user'
    }
  },
  resolve: updateUserMutationDeprecatedResolver
};
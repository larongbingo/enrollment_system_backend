import { GraphQLSchema } from 'graphql';

import { rootQueryObject } from './queries';
import { rootMutationObject } from './mutations';

export const Schema = new GraphQLSchema({
  query: rootQueryObject,
  mutation: rootMutationObject
});
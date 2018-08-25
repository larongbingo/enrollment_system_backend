import { GraphQLObjectType } from 'graphql';

import { userQueryObject } from './queryObjects';

export const rootQueryObject = new GraphQLObjectType({
  name: "Queries",
  description: "Holds all of the GET Requests",
  fields: {
    Users: userQueryObject
  }
});
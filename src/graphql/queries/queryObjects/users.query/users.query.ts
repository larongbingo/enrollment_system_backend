import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';

import { UserAttributes } from '@database/index';
import { UserType } from '@graphql/types';
import { userQueryResolver } from './users.query.resolver';

export const userQueryObject: GraphQLFieldConfig<UserAttributes, void> = {
  description: 'Returns all of the public information of all users', 
  type: new GraphQLList(UserType),
  args: {
    id: {
      type: GraphQLString,
      description: 'The unique identifier key of the user'
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user'
    },
    middleName: {
      type: GraphQLString,
      description: 'The middle name of the user'
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user'
    }
  },
  resolve: userQueryResolver
};

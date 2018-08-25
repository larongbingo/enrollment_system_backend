import { GraphQLFieldResolver } from 'graphql';

import { UserAttributes, Models } from '@database/index';

export const userQueryResolver: GraphQLFieldResolver<UserAttributes, void> = 
  (source, args) => {
    return Models.Users.findAll({ where: args });
  }
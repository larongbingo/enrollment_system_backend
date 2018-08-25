import { GraphQLInputObjectTypeConfig, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

import { UserAttributes } from '@database/index';

export type UserDetails = {
  token: string;
  update: UserAttributes;
};

const ValidFieldsTypeConfig: GraphQLInputObjectTypeConfig = {
  name: 'ValidFields',
  description: 'All of the fields that the user can edit or update',
  fields: () => ({
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The first name of the user',
    },
    middleName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The middle name of the user',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The last name of the user',
    },
    address: {
      type: GraphQLString,
      description: 'The address of the user',
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the user'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user'
    }
  })
};

export const ValidFieldsType = new GraphQLInputObjectType(ValidFieldsTypeConfig);
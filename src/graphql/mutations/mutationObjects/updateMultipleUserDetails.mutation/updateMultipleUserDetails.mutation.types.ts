import { GraphQLInputObjectTypeConfig, GraphQLString, GraphQLInputObjectType } from 'graphql';

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
      type: GraphQLString,
      description: 'The first name of the user',
    },
    middleName: {
      type: GraphQLString,
      description: 'The middle name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user',
    },
    address: {
      type: GraphQLString,
      description: 'The address of the user',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user'
    },
    password: {
      type: GraphQLString,
      description: 'The password of the user'
    }
  })
};

export const ValidFieldsType = new GraphQLInputObjectType(ValidFieldsTypeConfig);
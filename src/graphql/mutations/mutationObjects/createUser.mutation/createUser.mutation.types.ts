import { GraphQLInputObjectTypeConfig, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

import { UserAttributes } from '@database/index';

export interface NewUserDetails {
  userDetails: UserAttributes
};

const RequiredValidFieldsTypeConfig: GraphQLInputObjectTypeConfig = {
  name: 'RequiredValidFields',
  description: 'All of the fields that the user needs to fill up',
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

export const RequiredValidFieldsType = new GraphQLInputObjectType(RequiredValidFieldsTypeConfig);
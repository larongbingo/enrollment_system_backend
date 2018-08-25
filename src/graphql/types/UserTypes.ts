import { GraphQLObjectType, GraphQLString, GraphQLObjectTypeConfig } from 'graphql';

import { UserAttributes } from '@database/index';

const UserTypeConfig: GraphQLObjectTypeConfig<UserAttributes, void> = {
  name: "User",
  description: "Represents all accounts in the app",
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The unique identifier of the user',
      resolve(userInstance) {
        return userInstance.id;
      }
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
      resolve(userInstance) {
        return userInstance.firstName;
      }
    },
    middleName: {
      type: GraphQLString,
      description: 'The middle name of the user',
      resolve(userInstance) {
        return userInstance.middleName;
      }
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user',
      resolve(userInstance) {
        return userInstance.lastName;
      }
    },
    address: {
      type: GraphQLString,
      description: 'The address of the user',
      resolve(userInstance) {
        return userInstance.address;
      }
    }
  })
}

export const UserType = new GraphQLObjectType(UserTypeConfig);
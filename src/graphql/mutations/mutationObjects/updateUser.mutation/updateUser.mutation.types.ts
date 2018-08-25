import { GraphQLEnumValueConfigMap } from 'graphql';

export enum ValidFields {
  FirstName = 'firstName',
  MiddleName = 'middleName',
  LastName = 'lastName',
  Address = 'address',
  Username = 'username',
  Password = 'password'
}

export const fieldGraphQLEnum: GraphQLEnumValueConfigMap = {
  firstName: {
    value: ValidFields.FirstName
  },
  middleName: {
    value: ValidFields.MiddleName
  },
  lastName: {
    value: ValidFields.LastName
  },
  address: {
    value: ValidFields.Address
  },
  username: {
    value: ValidFields.Username
  },
  password: {
    value: ValidFields.Password
  }
};

export type UpdateUser = {
  field: ValidFields,
  newValue: string,
  token: string
};
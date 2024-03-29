import { DefineOptions, DefineAttributes, Sequelize, UUID, UUIDV4, STRING, ENUM, BOOLEAN } from 'sequelize';

import { Models } from '@database/index';
import { UserInstance, UserAttributes, UserTypes, UserCreationError } from './user.types';
import { HashCredentials } from './hash.credentials';

export function UserModelFactory(sequelize: Sequelize) {
  const options: DefineOptions<UserInstance> = {
    hooks: {
      async beforeUpdate(user) {
        if(user.password) {
          await HashCredentials(user, user.password)
          .then(pw => user.password = pw);
        }
      },
      async beforeCreate(user) {
        await Models.Users.findOne({ where: { username: user.username } })
        .then(user => { if(user) throw new UserCreationError('Username already taken', 'Username already taken', user) });

        await HashCredentials(user, user.password)
        .then(pw => user.password = pw);
      }
    },
    paranoid: true
  };

  const attributes: DefineAttributes = {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    userType: { 
      type: ENUM(
        UserTypes.GUEST,
        UserTypes.ADMIN,
        UserTypes.STAFF,
        UserTypes.STUDENT
      ), 
      defaultValue: UserTypes.GUEST 
    },
    isEnrolled: { type: BOOLEAN, defaultValue: false },

    firstName: { type: STRING, allowNull: false },
    middleName: { type: STRING, allowNull: false },
    lastName: { type: STRING, allowNull: false },
    address: { type: STRING, allowNull: true },

    email: { type: STRING, allowNull: true },

    username: { type: STRING, allowNull: false },
    password: { type: STRING, allowNull: false }
  };

  const UserModelName: string = 'users';

  return sequelize.define<UserInstance, UserAttributes>
    (UserModelName, attributes, options);
}
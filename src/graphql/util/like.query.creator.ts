import { Op } from 'sequelize';

import { UserAttributes } from '@database/index';

export function likeQueryCreator(user: UserAttributes, fieldsToUpdate: string[]): any {
  let updatedUser: any = user;

  fieldsToUpdate.forEach(field => {
    if(updatedUser[field]) {
      updatedUser[field] = {
        [Op.like]: `%${user[field]}%`
      }
    }
  });

  return updatedUser;
}
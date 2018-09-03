import { compare } from 'bcryptjs';

import { UserInstance, Models } from '@database/index';

export async function logIn(username: string, password: string): Promise<UserInstance | null> {
  return Models.Users.findOne({ where: { username: username } })
    .then(async queryResult => {
      if(!queryResult) return null;

      let credentials = concatenateCredentials(queryResult, password);

      return compare(credentials, queryResult.password)
        .then(compareResult => compareResult ? queryResult : null);
    });
}

export function concatenateCredentials(userInstance: UserInstance, password: string): string {
  return userInstance.username + password;
}
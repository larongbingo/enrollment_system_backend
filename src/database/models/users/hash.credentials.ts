import { genSalt, hash } from 'bcryptjs';

import { UserInstance } from './user.types';

export async function HashCredentials(user: UserInstance, password: string): Promise<string> {
  return genSalt(10)
    .then(salt => hash(user.username + password, salt));
}
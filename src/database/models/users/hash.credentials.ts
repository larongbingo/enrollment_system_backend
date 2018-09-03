import { genSalt, hash } from 'bcryptjs';

import { concatenateCredentials } from '@database/index';

import { UserInstance } from './user.types';

export async function HashCredentials(user: UserInstance, password: string): Promise<string> {
  return genSalt(10)
    .then(salt => hash(concatenateCredentials(user, password), salt));
}
import 'mocha';

import { logInTest } from './logIn.test';
import { storeGeneratedTokenTest } from './storeGeneratedToken.test';
import { verifyTokenTest } from './verifyToken.test';
import { createUserTest } from './createUser.test';

export function functionTests() {
  describe('Functions Tests', function() {
    createUserTest();
    logInTest();
    storeGeneratedTokenTest();
    verifyTokenTest();
  });
}
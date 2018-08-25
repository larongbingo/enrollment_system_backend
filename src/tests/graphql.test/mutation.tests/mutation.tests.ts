import { Server } from 'http';
import 'mocha';

import { logInMutationTest } from './logIn.mutation.test';
import { createUserMutationTest } from './createUser.mutation.test';
import { updateMultipleUserDetailsMutationTest } from './updateMultipleUserDetails.mutation.test';

export function mutationTests(server: Server) {
  describe('Mutation Tests', function() {
    logInMutationTest(server);
    createUserMutationTest(server);
    updateMultipleUserDetailsMutationTest(server);
  });
}
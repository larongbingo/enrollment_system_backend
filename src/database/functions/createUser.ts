import { Models, UserAttributes, UserInstance } from '@database/index';

/**
 * Checks if the username is already taken
 * True if the username is taken, false otherwise
 * @param username The username to be checked
 * @returns True if the username is taken, false otherwise
 */
async function checkUsernameDuplicates(username: string): Promise<boolean> {
  return Models.Users.findOne({ where: { username: username } })
  .then(async res => res ? true : false);
}

/**
 * If the username is not taken, it will create a new user.
 * @param userDetails The details of the user that needs to be created
 * @returns Returns a UserInstance if the user is created, null otherwise
 */
export async function createUser(userDetails: UserAttributes): Promise<UserInstance | null> {
  return checkUsernameDuplicates(userDetails.username)
  .then(async res => {
    if(res) return null;

    return Models.Users.create(userDetails);
  });
}
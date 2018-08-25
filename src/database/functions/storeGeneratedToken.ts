import { sign } from 'jsonwebtoken';

import { UserAttributes, Models } from '@database/index';

/**
 * Stores a copy of the token to the database
 * @param user The details of the user
 * @returns { Promise<string> } The token of the user
 */
export async function storeGeneratedToken(user: UserAttributes): Promise<string> {
  return await generateToken(user)
  .then(async token => {
    await Models.Tokens.create({ userId: user.id!, token: token });
    return token;
  });
}

/**
 * Generates the token of the user
 * @param user The details of the user
 * @returns { Promise<string> } The token of the user
 */
async function generateToken(user: UserAttributes): Promise<string> {
  return await sign({ username: user.username }, process.env.JWT_PASSWORD!)
}
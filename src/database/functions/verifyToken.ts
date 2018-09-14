import { decode } from 'jsonwebtoken';

import { Models, TokenInstance, TokenTypes } from '@database/index';

/**
 * Checks if the given session token is valid or not.
 * A valid token can be found on the database and can be
 * decoded by the JWT.
 * @param token The token to check
 * @returns Returns the TokenInstance if the token is valid, null otherwise
 */
export async function verifyToken(token: string): Promise<TokenInstance | null> {
  return await Models.Tokens.findOne({where: { token: token }})
    .then(async queryRes => {
      if(!queryRes) return null;

      if(decode(token)) return queryRes;
      
      return null;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
}
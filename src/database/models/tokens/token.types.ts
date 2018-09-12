import { Instance } from 'sequelize';

export interface TokenAttributes {
  /**
   * Holds what type of token it is
   */
  token_type?: TokenTypes;

  token: string;

  userId?: string;
}

export enum TokenTypes {
  /**
   * Session tokens are for logged in users
   */
  Session = '@TOKENTYPES/SESSION',

  /**
   * Request tokens are for users attempting to login
   */
  Request = '@TOKENTYPES/REQUEST'
}

export type TokenInstance = Instance<TokenAttributes> & 
  TokenAttributes;


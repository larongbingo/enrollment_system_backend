import { Instance } from 'sequelize';

export interface TokenAttributes {
  token: string;

  userId: string;
}

export type TokenInstance = Instance<TokenAttributes> & 
  TokenAttributes;


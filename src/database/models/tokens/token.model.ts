import { Sequelize, DefineOptions, DefineAttributes, STRING, UUID, ENUM } from 'sequelize';

import { TokenInstance, TokenAttributes, TokenTypes } from './token.types';

export function TokenModelFactory(sequelize: Sequelize) {
  const attributes: DefineAttributes = {
    token: { type: STRING },
    token_type: { type: ENUM(TokenTypes.Request, TokenTypes.Session), defaultValue: TokenTypes.Session },
    userId: { type: UUID }
  };

  const options: DefineOptions<TokenInstance> = {};

  const TokenModelName: string = 'tokens';

  return sequelize.define<TokenInstance, TokenAttributes>
    (TokenModelName, attributes, options);
}
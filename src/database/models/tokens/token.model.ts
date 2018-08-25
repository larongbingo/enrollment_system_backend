import { Sequelize, DefineOptions, DefineAttributes, STRING, UUID } from 'sequelize';

import { TokenInstance, TokenAttributes } from './token.types';

export function TokenModelFactory(sequelize: Sequelize) {
  const attributes: DefineAttributes = {
    token: { type: STRING },
    userId: { type: UUID }
  };

  const options: DefineOptions<TokenInstance> = {};

  const TokenModelName: string = 'tokens';

  return sequelize.define<TokenInstance, TokenAttributes>
    (TokenModelName, attributes, options);
}
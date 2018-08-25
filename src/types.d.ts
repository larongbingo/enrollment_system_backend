import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

declare global {

  /**
   * @deprecated Does not work with optional fields
   */
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
  }


}
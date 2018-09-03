import { Instance } from 'sequelize';

export interface UserAttributes {

  /**
   * Allows 'UserAttributes[key]' pattern
   * for getting values
   */
  [key: string]: any;

  /**
   * Unique Identifier of each user
   */
  id?: string;

  /**
   * First Name of the user
   */
  firstName: string;

  /**
   * Middle Name of the user
   */
  middleName: string;

  /**
   * Last Name of the user
   */
  lastName: string;

  /**
   * Address of the user.
   * Does not require to be filled up immediately
   */
  address?: string;

  /**
   * If true, then the account/user/student is enrolled in the school,
   * false otherwise.
   */
  isEnrolled?: boolean;

  /**
   * The account type of the user; determines whether some
   * functions/features are accessible or not.
   * 
   * This is a private type and MUST NOT be sent/given to the public.
   * This must be given to the ADMINS/STAFFS Only.
   */
  userType?: UserTypes;

  /**
   * Email of the user; sends private details and info directly to the user
   * 
   * This is a private type and MUST NOT be sent/given to the public.
   * This must be given to the USER Only.
   */
  email?: string;

  /**
   * Username of the user; identifier of the account.
   * 
   * This is a private type and MUST NOT be sent/given to the public.
   * This must be given to the USER Only.
   */
  username: string;

  /**
   * HASHED password of the user
   * 
   * This is a private type and MUST NOT be sent/given to the public.
   * This must be given to the USER Only.
   */
  password: string;

};

export type UserInstance = 
  Instance<UserAttributes> & UserAttributes & { [key: string]: any };

export enum UserTypes {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF'
};

export class UserCreationError extends Error {
  constructor(name: string, message: string, userDetails: UserAttributes) {
    super(message);
    this.userDetails = userDetails;
    this.name = name;
  }

  public userDetails: UserAttributes;
}
export interface LogInCredentials {
  /**
   * Username sent from the client
   */
  username: string;

  /**
   * Password sent from the client
   */
  password: string;

  /**
   * CSRF Token for logging
   */
  CSRF_Token?: string;
}
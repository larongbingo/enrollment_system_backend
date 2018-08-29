import { Instance } from 'sequelize';

export interface LogAttributes {
  
  /**
   * The id of the user that sent something to the endpoint
   */
  user: string;

  /**
   * Message of the request
   */
  message: string;
  
  /**
   * Dictates which endpoint that recieved the request
   */
  graphql_endpoint: string;

  /**
   * Dictates whether the request was successful or not
   */
  request_status: boolean;
}

export type LogInstance = Instance<LogAttributes> & LogAttributes;
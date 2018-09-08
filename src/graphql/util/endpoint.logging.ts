import { Models, LogAttributes } from '@database/index';

export async function SuccessfulRequestLogging(graphql_args: Object, graphql_endpoint: string, message: string, userId?: string) {
  let log: LogAttributes = {
    graphql_arguments: JSON.stringify(graphql_args),
    graphql_endpoint: graphql_endpoint,
    message: message,
    user: userId,
    request_status: true
  };

  return await Models.Logs.create(log);
}

export async function FailedRequestLogging(graphql_args: Object, graphql_endpoint: string, message: string) {
  let log: LogAttributes = {
    graphql_arguments: JSON.stringify(graphql_args),
    graphql_endpoint: graphql_endpoint,
    message: message,
    request_status: false
  }

  return await Models.Logs.create(log);
}
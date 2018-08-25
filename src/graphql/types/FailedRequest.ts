import { Response } from './Response';

export class FailedRequest extends Response {
  constructor(message?: string) {
    super(false, message);
  }
}
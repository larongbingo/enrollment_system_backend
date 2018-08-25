import { Response } from './Response';

export class SuccessfulRequest extends Response {
  data: Readonly<Object>;
  
  constructor(data: Object) {
    super(true);
    this.data = data;
  }
}
export class Response {
  constructor(success: Boolean, message?: string) {
    this.success = success;
    this.message = message;
  }

  public success: Readonly<Boolean>;
  public iat: Readonly<Number> = Date.now();
  public message?: Readonly<string>;
}
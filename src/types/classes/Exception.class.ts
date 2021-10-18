interface IExceptionConstructorArguments {
  message?: string;
  error?: any;
}

export class Exception extends Error {
  error?: any;

  constructor(args?: IExceptionConstructorArguments) {
    super(args?.message);
    this.error = args?.error;
  }
}

export interface IError {
  message: string;
}

export class Error implements IError {
  constructor(public readonly message: string) {}
}

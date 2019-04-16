import { ITokenPayload } from 'src/Application/ITokenPayload';

export interface ITokenAdapter {
  sign(payload: ITokenPayload): string;
}

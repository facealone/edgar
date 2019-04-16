import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenAdapter } from 'src/Application/Adapter/ITokenAdapter';
import { ITokenPayload } from 'src/Application/ITokenPayload';

@Injectable()
export class TokenAdapter implements ITokenAdapter {
  constructor(private readonly jwtService: JwtService) {}

  sign = (payload: ITokenPayload): string => {
    return this.jwtService.sign(payload);
  };
}

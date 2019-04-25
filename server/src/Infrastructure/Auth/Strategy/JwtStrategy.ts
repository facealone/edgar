import 'dotenv/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ITokenPayload } from 'src/Application/ITokenPayload';
import { IQueryBusAdapter } from 'src/Application/Adapter/Bus/IQueryBusAdapter';
import { GetUserByIdQuery } from 'src/Application/User/Query/GetUserByIdQuery';
import { UserDetailView } from 'src/Application/User/View/UserDetailView';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate = async (payload: ITokenPayload): Promise<UserDetailView> => {
    const query = new GetUserByIdQuery();
    query.id = payload.id;

    const userDetailView = await this.queryBus.execute(query);
    if (!(userDetailView instanceof UserDetailView)) {
      throw new UnauthorizedException();
    }

    return userDetailView;
  };
}

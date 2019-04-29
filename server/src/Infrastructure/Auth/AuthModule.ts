import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { RegisterCommandHandler } from 'src/Application/Auth/Command/RegisterCommandHandler';
import { BusModule } from '../BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { RegisterAction } from 'src/Infrastructure/Auth/Action/RegisterAction';
import { User } from 'src/Domain/User/User.entity';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { MailerAdapter } from 'src/Infrastructure/Adapter/MailerAdapter';
import { LoginAction } from './Action/LoginAction';
import { TokenAdapter } from '../Adapter/TokenAdapter';
import { LoginCommandHandler } from 'src/Application/Auth/Command/LoginCommandHandler';
import { JwtStrategy } from './Strategy/JwtStrategy';

@Module({
  imports: [
    BusModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RegisterAction, LoginAction],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IMailerAdapter', useClass: MailerAdapter },
    { provide: 'ITokenAdapter', useClass: TokenAdapter },
    JwtStrategy,
    RegisterCommandHandler,
    LoginCommandHandler,
    CanUserRegister,
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}

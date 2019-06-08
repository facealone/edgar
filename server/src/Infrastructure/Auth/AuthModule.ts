import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { RegisterCommandHandler } from 'src/Application/Auth/Command/RegisterCommandHandler';
import { BusModule } from '../BusModule';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { RegisterController } from 'src/Infrastructure/Auth/Controller/RegisterController';
import { User } from 'src/Domain/User/User.entity';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { MailerAdapter } from 'src/Infrastructure/Adapter/MailerAdapter';
import { LoginController } from './Controller/LoginController';
import { LoginCommandHandler } from 'src/Application/Auth/Command/LoginCommandHandler';
import { TokenStrategy } from './Strategy/TokenStrategy';
import { EncryptionAdapter } from '../Adapter/EncryptionAdapter';

@Module({
  imports: [
    BusModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [LoginController, RegisterController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IMailerAdapter', useClass: MailerAdapter },
    { provide: 'IEncryptionAdapter', useClass: EncryptionAdapter },
    TokenStrategy,
    RegisterCommandHandler,
    LoginCommandHandler,
    CanUserRegister,
  ],
  exports: [PassportModule],
})
export class AuthModule {}

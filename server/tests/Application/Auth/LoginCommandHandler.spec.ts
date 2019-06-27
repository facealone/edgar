import { Test } from '@nestjs/testing';
import { LoginCommandHandler } from 'src/Application/Auth/Command/LoginCommandHandler';
import { UserRepository } from 'src/Infrastructure/User/Repository/UserRepository';
import { EncryptionAdapter } from 'src/Infrastructure/Adapter/EncryptionAdapter';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from 'src/Application/Auth/Command/LoginCommand';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('[auth] Login', () => {
  let handler: LoginCommandHandler;
  let userRepository: UserRepository;
  let encryptionAdapter: EncryptionAdapter;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginCommandHandler,
        UserRepository,
        EncryptionAdapter,
        { provide: 'IUserRepository', useClass: UserRepository },
        { provide: 'IEncryptionAdapter', useClass: EncryptionAdapter },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        findOneByEmail: () => new User({ email: 'mathieu.marchois@gmail.com' }),
        findOne: () => new User({ email: 'mathieu.marchois@gmail.com' }),
      })
      .compile();

    userRepository = module.get<UserRepository>(UserRepository);
    encryptionAdapter = module.get<EncryptionAdapter>(EncryptionAdapter);
    handler = module.get<LoginCommandHandler>(LoginCommandHandler);
  });

  it('Should authenticate successfully', async () => {
    const user = new User({ email: 'mathieu.marchois@gmail.com' });

    jest
      .spyOn(userRepository, 'findOneByEmail')
      .mockImplementation(() => Promise.resolve(user));

    jest.spyOn(encryptionAdapter, 'compare').mockImplementation(() => true);

    expect(await handler.execute(new LoginCommand())).toBe(user);
  });

  //it('Should throw an exception when user not found', () => {});
  //it('Should throw an exception when user password not match', () => {});
});

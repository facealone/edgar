import { LoginCommandHandler } from 'src/Application/Auth/Command/LoginCommandHandler';
import { User } from 'src/Domain/User/User.entity';
import { LoginCommand } from 'src/Application/Auth/Command/LoginCommand';
import { AuthenticatedView } from 'src/Application/Auth/View/AuthenticatedView';
import { House } from 'src/Domain/House/House.entity';
import { HouseView } from 'src/Application/House/View/HouseView';
import * as EncryptionAdapter from 'src/Infrastructure/Adapter/EncryptionAdapter';
import * as UserRepository from 'src/Infrastructure/User/Repository/UserRepository';

jest.mock('src/Infrastructure/Adapter/EncryptionAdapter');
jest.mock('src/Infrastructure/User/Repository/UserRepository');

describe('[auth] Login', () => {
  it('Should authenticate successfully', async () => {
    const house = new House({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Boulevard Ney',
    });

    const user = new User({
      email: 'mathieu.marchois@gmail.com',
      firstName: 'Mathieu',
      lastName: 'MARCHOIS',
      currentHouse: house,
    });

    const command = new LoginCommand();
    command.email = 'mathieu.marchois@gmail.com';
    command.password = 'password';

    const expectedResult = new AuthenticatedView(
      'Mathieu',
      'MARCHOIS',
      'mathieu.marchois@gmail.com',
      'abcdefgToken',
      new HouseView('11111111-1111-1111-1111-111111111111', 'Boulevard Ney'),
    );

    const userRepository = <jest.Mock<typeof UserRepository>>UserRepository;

    const encryptionAdapter = EncryptionAdapter.mock.instances[0];

    const handler = new LoginCommandHandler(userRepository, encryptionAdapter);

    expect(await handler.execute(command)).toEqual(expectedResult);
  });

  //it('Should throw an exception when user not found', () => {});

  //it('Should throw an exception when user password not match', () => {});
});

import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../Command/CreateUserCommand';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  execute = async (command: CreateUserCommand) => {
    await alert('test');
  };
}

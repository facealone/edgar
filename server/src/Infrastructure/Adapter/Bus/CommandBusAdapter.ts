import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';

@Injectable()
export class CommandBusAdapter implements ICommandBusAdapter {
  constructor(private readonly commandBus: CommandBus) {}

  execute = (command: ICommand) => {
    return this.commandBus.execute(command);
  };
}

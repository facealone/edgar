import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ICommandBusAdapter } from 'src/Application/Adapter/Bus/ICommandBusAdapter';
import { ICommand } from 'src/Application/ICommand';

@Injectable()
export class CommandBusAdapter implements ICommandBusAdapter {
  constructor(private readonly commandBus: CommandBus) {}

  public execute = (command: ICommand) => {
    return this.commandBus.execute(command);
  };
}

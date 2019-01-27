import { ICommand } from 'src/Application/ICommand';

export interface ICommandBusAdapter {
  execute(command: ICommand);
}

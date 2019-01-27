import { IsEmail, IsNotEmpty } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';

export class CreateUserCommand implements ICommand {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

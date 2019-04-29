import { AbstractMail } from 'src/Domain/AbstractMail';

export interface IMailerAdapter {
  send(mail: AbstractMail): void;
}

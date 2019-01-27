import { Mail } from 'src/Domain/Common/Mail/Mail';

export interface IMailerAdapter {
  send(mail: Mail): void;
}

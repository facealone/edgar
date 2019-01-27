import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { Mail } from 'src/Domain/Common/Mail/Mail';

@Injectable()
export class MailerAdapter implements IMailerAdapter {
  send = (mail: Mail): void => {
    alert('send');
  };
}

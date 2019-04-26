import 'dotenv/config';
import {
  send as SendgridSend,
  setApiKey,
  setSubstitutionWrappers,
} from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { Mail } from 'src/Domain/Common/Mail/Mail';

setApiKey(process.env.SENDGRID_API_KEY);
setSubstitutionWrappers('{{', '}}');

@Injectable()
export class MailerAdapter implements IMailerAdapter {
  send = (mail: Mail): void => {
    SendgridSend({
      to: mail.receiver,
      from: process.env.SENDER_MAIL,
      templateId: mail.templateId,
      substitutions: mail.substitutions,
    });
  };
}

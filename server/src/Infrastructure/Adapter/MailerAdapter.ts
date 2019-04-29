import 'dotenv/config';
import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { IMailerAdapter } from 'src/Application/Adapter/IMailerAdapter';
import { AbstractMail } from 'src/Domain/AbstractMail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class MailerAdapter implements IMailerAdapter {
  public send = (mail: AbstractMail): void => {
    sgMail.send({
      from: process.env.SENDER_MAIL,
      templateId: mail.templateId,
      personalizations: [
        {
          to: [
            {
              email: mail.receiver,
            },
          ],
          dynamicTemplateData: mail.substitutions,
        },
      ],
    });
  };
}

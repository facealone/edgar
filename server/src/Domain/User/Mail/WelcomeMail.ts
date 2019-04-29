import 'dotenv/config';
import { AbstractMail } from 'src/Domain/AbstractMail';

export class WelcomeMail extends AbstractMail {
  public readonly templateId = process.env.SENDGRID_TEMPLATE_WELCOME;
}

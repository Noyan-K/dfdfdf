import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailerService } from '@nestjs-modules/mailer';

import { User } from '../user/models/user.model';

type MailError = {
  code: string;
  response: string;
  responseCode: number;
  command: string;
  rejected: string[];
  rejectedErrors: MailError[];
};

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(
    user: User,
    token: string,
    isItRegistration?: boolean,
  ) {
    let url = encodeURI(
      `${this.configService.get(
        'FRONTEND_URL',
      )}/auth/reset-password?token=${token}`,
    );

    if (isItRegistration === false) {
      url = encodeURI(`${url}&password=${user.password}`);
    }

    await this.mailerService
      .sendMail({
        to: user.email,
        from: this.configService.get('EMAIL_USER'),
        subject: 'Подтверждение почты',
        html: `
        <h1>Здравствуйте!</h1>
        <p>Вы начали процесс подтверждение почты. Чтобы его завершить, перейдите по ссылке <a href = "${url}">ссылка</a></p>
        <b>Ваш новый пароль: ${user.password}</>
      `,
      })
      .catch((err: MailError) => {
        throw new HttpException(err.response, err.responseCode);
      });
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/models/user.model';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string, isItRegistration?: boolean) {
    let url = encodeURI(
      `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${token}`,
    );

    if (!isItRegistration) {
      url = encodeURI(`${url}&password=${user.password}`);
    }

    await this.mailerService.sendMail({
      to: user.email,
      from: this.configService.get('EMAIL_USER'),
      subject: 'Подтверждение почты',
      html: `
        <h1>Здравствуйте!</h1>
        <p>Вы начали процесс подтверждение почты. Чтобы его завершить, перейдите по ссылке <a href = "${url}">ссылка</a></p>
        <b>Ваш новый пароль: ${user.password}</>
      `,
    }).catch((err) => {
      throw new BadRequestException(err);
    });
  }
}

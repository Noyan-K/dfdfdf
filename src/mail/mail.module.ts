import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('EMAIL_HOST'),
                    port: config.get('EMAIL_PORT'),
                    secure: true,
                    auth: {
                        user: config.get('EMAIL_USER'),
                        pass: config.get('EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: config.get('EMAIL_USER'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}

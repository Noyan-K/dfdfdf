import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Hello = 'Welcome to Marketplace backend service';

  getHello(): string {
    return this.Hello;
  }
}

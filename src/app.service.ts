import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    Hello = 'Welcome to Fabrik backend service';

    getHello(): string {
        return this.Hello;
    }
}

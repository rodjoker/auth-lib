import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello2(): string {
    return 'Hello World!';
  }
}

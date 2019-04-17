import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async test(): Promise<string[]> {
    return ['test1', 'test2', 'test3'];
  }
}

import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @Patch(':id')
  async update(@Param() { id }: {id: number}, @Body() user): Promise<User> {
    return this.userService.update(id, user);
  }

  @Post('login')
  async login(@Body() user): Promise<{user: User, token: string}> {
    return this.userService.login(user);
  }

}

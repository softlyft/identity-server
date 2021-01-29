import {
    Controller,
    Get,
    Post,
    Body,
    BadRequestException,
    UseGuards,
    Request,
    NotFoundException,
    HttpCode,
    Put,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('users')
  async getUsers(
    @Request() req,
  ): Promise<any> {
      return {
          message: 'Here is the user'
      }
  }

  @Post('users')
  async postUser(
    @Request() req,
  ): Promise<any> {

    return await this.usersService.create(req.body);
  }
}

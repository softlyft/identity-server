import * as bcrypt from 'bcrypt';
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
  async registerUser(
    @Request() req,
  ): Promise<any> {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const userData = {
        firstName, lastName, email, salt, hash
    };
    return await this.usersService.create(userData);
  }
}

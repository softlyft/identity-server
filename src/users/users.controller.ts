import * as bcrypt from 'bcrypt';
import {
    Controller,
    Get,
    Post,
    Param,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(
    @Request() req,
  ): Promise<any> {
    return await this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(
    @Request() req,
  ): Promise<any> {
    const userId = req.user._id;
    return await this.usersService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:username')
  async getUserByUsername(
    @Param('username') username: string,
    @Request() req,
  ): Promise<any> {
    return await this.usersService.getUserByUsername(username);
  }

  @Post('user')
  async registerUser(
    @Request() req,
  ): Promise<any> {
    const { firstName, lastName, email, password, username } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const userData = {
        firstName, lastName, email, salt, hash, username
    };
    return await this.usersService.create(userData);
  }
}

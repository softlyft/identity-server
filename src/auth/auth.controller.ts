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
  import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}

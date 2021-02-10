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
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

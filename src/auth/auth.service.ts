import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if (user) {
            // decrypt password
            const isMatch = await bcrypt.compare(password, user.hash);
            if (isMatch) {
                return user;
            }
            return null;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { sub: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName  };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

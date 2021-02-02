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
        const user = await this.usersService.findOne(email);
        if (user) {
            // decrypt password
            const isMatch = await bcrypt.compare(password, user.hash);
            if (isMatch) {
                const { hash, ...result } = user;
                return result;
            }
            return null;
        }
        return null;
      }
    
      async login(user: any) {
        const userData = await this.validateUser(user.email, user.password);
        const payload = { sub: userData._id, email: userData.email, firstName: userData.firstName, lastName: userData.lastName  };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUserName(username);
        let isPasswordCorrect = await bcrypt.compare(pass, user.password);
        if(user && isPasswordCorrect) {
            const { password, ...result } = user;
            console.log(result);
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            username: user.userName,
            sub: user.id,
            role: user.role
        }
        return{ 
            access_token: this.jwtService.sign(payload)
        };
    }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public generateToken<T extends object>(payload: T): string {
        return this.jwtService.sign(payload);
    }

    public verifyToken(token: string): boolean {
        try {
            this.jwtService.verify(token, {
                ignoreExpiration: false,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    public decodeToken<T extends object>(token: string): T {
        return this.jwtService.decode<T>(token);
    }
}

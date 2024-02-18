import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/modules/user.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TokenService } from '../services/token.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Module({
    imports: [UserModule],
    providers: [AuthService, TokenService, AuthGuardService],
    controllers: [AuthController],
    exports: [AuthGuardService, TokenService],
})
export class AuthModule {}

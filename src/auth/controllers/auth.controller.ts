import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/')
    async login(@Body() authBody: LoginRequestDTO): Promise<LoginResponseDTO> {
        const { email, password } = authBody;

        const user = await this.authService.verifyUserLoginCredential(
            email,
            password,
        );

        return new LoginResponseDTO(user.token, user.userAccountType);
    }
}

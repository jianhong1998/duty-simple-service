import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login.dto';
import {
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpExceptionDTO } from 'src/common/dto/http-exception/http-exception.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/')
    @HttpCode(200)
    @ApiOkResponse({
        description: 'User login successfully',
        type: LoginResponseDTO,
    })
    @ApiUnauthorizedResponse({
        description: 'User login failled due to email or password incorrect',
        type: HttpExceptionDTO,
    })
    async login(@Body() authBody: LoginRequestDTO): Promise<LoginResponseDTO> {
        const { email, password } = authBody;

        const user = await this.authService.verifyUserLoginCredential(
            email,
            password,
        );

        return new LoginResponseDTO(user.token, user.userAccountType);
    }
}

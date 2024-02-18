import { Controller, Get } from '@nestjs/common';
import { UserDBService } from '../services/user.db.service';
import { AllowAccountTypes } from 'src/common/custom-decorators/allow-account-types.decorator';
import { UserAccountType } from '../enums/user-account-type.type';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetAllUserResponseDTO } from '../dto/get-all-user-response.dto';
import { HttpExceptionDTO } from 'src/common/dto/http-exception/http-exception.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user')
export class UserController {
    constructor(private userDBService: UserDBService) {}

    @Get('/')
    @ApiOkResponse({
        type: GetAllUserResponseDTO,
    })
    @ApiForbiddenResponse({
        description: 'User does not allowed to access this resource',
        type: HttpExceptionDTO,
    })
    @ApiUnauthorizedResponse({
        description: 'User is not authenticated',
        type: HttpExceptionDTO,
    })
    @AllowAccountTypes([UserAccountType.MANAGER])
    async getAllUsers(): Promise<GetAllUserResponseDTO> {
        const users = await this.userDBService.getAll();

        return new GetAllUserResponseDTO(users);
    }
}

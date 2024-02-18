import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDBService } from '../services/user.db.service';
import { AllowAccountTypes } from 'src/common/custom-decorators/allow-account-types.decorator';
import { UserAccountType } from '../enums/user-account-type.type';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetAllUserResponseDTO } from '../dto/get-all-user-response.dto';
import { HttpExceptionDTO } from 'src/common/dto/http-exception/http-exception.dto';
import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
} from '../dto/create-user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user')
export class UserController {
    constructor(
        private userDBService: UserDBService,
        private userService: UserService,
    ) {}

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

    @Post('/')
    @AllowAccountTypes([UserAccountType.MANAGER])
    @ApiCreatedResponse({
        type: CreateUserResponseDTO,
        description: 'User is created successfully',
    })
    @ApiBadRequestResponse({
        type: HttpExceptionDTO,
        description: 'Request body is incorrect',
    })
    @ApiUnauthorizedResponse({
        type: HttpExceptionDTO,
        description: 'User is not authenticated',
    })
    @ApiForbiddenResponse({
        type: HttpExceptionDTO,
        description: 'User does not allowed to access this resource',
    })
    async createUser(@Body() requestBody: CreateUserRequestDTO) {
        const newUser = await this.userService.createUserAccount(requestBody);

        return new CreateUserResponseDTO(newUser);
    }
}

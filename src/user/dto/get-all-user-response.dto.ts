import { IsArray, ValidateNested } from 'class-validator';
import { IUser } from '../types/user.type';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { Type } from 'class-transformer';

export class GetAllUserResponseDTO {
    @ApiProperty({
        isArray: true,
        type: UserDTO,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserDTO)
    users: UserDTO[];

    constructor(users: IUser[]) {
        this.users = users.map((user) => new UserDTO(user));
    }
}

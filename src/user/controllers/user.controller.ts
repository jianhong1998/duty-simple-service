import { Controller, Get } from '@nestjs/common';
import { UserDBService } from '../services/user.db.service';

@Controller('/user')
export class UserController {
    constructor(private userDBService: UserDBService) {}

    @Get('/')
    async getAllUsers() {
        const users = await this.userDBService.getAll();

        return users;
    }
}

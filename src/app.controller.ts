import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export class AppController {
    @Get('/')
    @HttpCode(200)
    getVersion(): { version: string } {
        return {
            version: '0.1.0',
        };
    }
}

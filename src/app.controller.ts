import {
    Controller,
    Get,
    HttpCode,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { Public } from './common/custom-decorators/public.decorator';
import { IsString } from 'class-validator';
import { HttpExceptionDTO } from './common/dto/http-exception/http-exception.dto';

class VersionDTO {
    @ApiProperty()
    @IsString()
    version: string;

    constructor(version: string) {
        this.version = version;
    }
}

@ApiTags('Root')
@Controller('/')
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get('/')
    @Public()
    @HttpCode(200)
    @ApiOkResponse({
        type: VersionDTO,
    })
    @ApiInternalServerErrorResponse({
        description: 'Cannot get environment variable `VERSION`.',
        type: HttpExceptionDTO,
    })
    getVersion(): VersionDTO {
        const version = this.configService.get('VERSION');

        if (!version)
            throw new InternalServerErrorException(
                "Cannot get environment variable 'VERSION'.",
            );

        return new VersionDTO(version);
    }
}

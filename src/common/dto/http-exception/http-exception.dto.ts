import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDTO {
    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;

    @ApiProperty()
    statusCode: number;
}

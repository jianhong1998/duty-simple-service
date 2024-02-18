import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    const port = parseInt(configService.get('PORT')) || 3001;

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const documentConfig = new DocumentBuilder()
        .setTitle('Duty Simple API Document')
        .setVersion('0.1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, documentConfig, {
        operationIdFactory: (_, methodKey) => methodKey,
    });

    SwaggerModule.setup('docs', app, document);

    await app.listen(port);
}
bootstrap();

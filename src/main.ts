import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// note: this is simple example so there no monorepo - libs, apps etc (no default by nest, nor by nx or pnpm ... workspaces)

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  // in case you need to set some setting to body parser app.use(bodyParser.json({ limit: '512mb' }));
  const apiPort = app.get(ConfigService).get<number>('API_PORT') || 3000;

  const docOptions = new DocumentBuilder()
    .setTitle('example sensor crud api')
    .setDescription('example sensor crud api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('api/docs', app, document);

  // global validation pipes can be set here
  // app.useGlobalPipes(new ValidationPipe({

  await app.listen(apiPort).then(() => {
    console.log(`API server is running on port ${apiPort}`);
  });
}
bootstrap();

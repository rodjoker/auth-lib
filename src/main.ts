import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'login-app-front-brown.vercel.app', // O la URL donde corre tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si vas a enviar cookies o headers de autorización
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
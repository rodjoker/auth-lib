import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 10000
  app.enableCors({
    origin: 'login-app-front-brown.vercel.app', // O la URL donde corre tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si vas a enviar cookies o headers de autorización
  });
  await app.listen(PORT ?? 3000);
}
bootstrap();
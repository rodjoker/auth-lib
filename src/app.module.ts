import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role/role.controller';
import { UsersService } from './users/users.service';
import { RolesModule } from './role/role.module';
import { PlansModule } from './plans/plans.module';   
import { NuveiService } from './payments/nuvei/nuvei.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.services';



@Module({
   imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt('5432', 10),
      username: process.env.DB_USERNAME || 'tu_usuario_db', 
      password: process.env.DB_PASSWORD || 'tu_contraseña_db',  
      database: process.env.DB_DATABASE || 'db-user-autenticatios',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Busca tus entidades (modelos de DB)
      synchronize: true, // ¡Solo para desarrollo! Sincroniza el esquema de la DB con tus entidades
    }),
    UsersModule, 
    AuthModule,
    RolesModule,
    PlansModule,
    PaymentsModule,

  ],
  controllers: [AppController, RoleController, PaymentsController, CsvController],
  providers: [AppService, NuveiService,CsvService],
})
export class AppModule {}

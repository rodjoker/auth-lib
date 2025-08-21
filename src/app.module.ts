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

// Entidades
import { Role } from './role/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { Plan } from './plans/entities/plan.entity';
// Si tienes entidades para role_permissions y roll, impórtalas aquí
// import { RolePermission } from './permission/entities/role-permission.entity';
// import { Roll } from './roll/roll.entity';

// Servicio para sembrar la base de datos
import { DatabaseSeedService } from './database/database-seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: process.env.DB_HOST || 'localhost',
      //port: parseInt(process.env.DB_PORT || '5432', 10),
      //username: process.env.DB_USERNAME || 'tu_usuario_db',
      //password: process.env.DB_PASSWORD || 'tu_contraseña_db',
      //database: process.env.DB_DATABASE || 'db-user-autenticatios',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo
    }),
    TypeOrmModule.forFeature([
      Role,
      Permission,
      Plan,
      // RolePermission,
      // Roll
    ]),
    UsersModule,
    AuthModule,
    RolesModule,
    PlansModule,
    PaymentsModule,
  ],
  controllers: [
    AppController,
    RoleController,
    PaymentsController,
    CsvController,
  ],
  providers: [
    AppService,
   // NuveiService,
    CsvService,
    DatabaseSeedService, // se ejecutará al iniciar
  ],
})
export class AppModule {}

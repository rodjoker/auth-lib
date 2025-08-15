// src/database/database-seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Plan } from '../plans/entities/plan.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedPermissions();
    await this.seedPlans();
  }

  private async seedRoles() {
    const roles = ['Gold', 'Silver', 'Bronze'];
    for (const name of roles) {
      const exists = await this.roleRepo.findOne({ where: { name } });
      if (!exists) {
        await this.roleRepo.save(this.roleRepo.create({ name }));
      }
    }
  }

  private async seedPermissions() {
    const permissions = ['create_user', 'view_user', 'delete_user'];
    for (const name of permissions) {
      const exists = await this.permissionRepo.findOne({ where: { name } });
      if (!exists) {
        await this.permissionRepo.save(this.permissionRepo.create({ name }));
      }
    }
  }

  private async seedPlans() {
    const plans = [
      { name: 'Plan Anual', description: 'Suscripción anual', priceMonthly: 0, priceSemiannual: 0, priceAnnual: 100 },
      { name: 'Plan Semestral', description: 'Suscripción semestral', priceMonthly: 0, priceSemiannual: 50, priceAnnual: 0 },
      { name: 'Plan Mensual', description: 'Suscripción mensual', priceMonthly: 10, priceSemiannual: 0, priceAnnual: 0 },
    ];
    for (const plan of plans) {
      const exists = await this.planRepo.findOne({ where: { name: plan.name } });
      if (!exists) {
        await this.planRepo.save(this.planRepo.create(plan));
      }
    }
  }
}

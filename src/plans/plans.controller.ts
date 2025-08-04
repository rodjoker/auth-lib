import { Controller, Get } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './entities/plan.entity';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async getAllPlans(): Promise<Plan[]> {
    return this.plansService.findAll();
  }
}
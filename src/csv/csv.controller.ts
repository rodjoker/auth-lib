import { Controller, Get, Query } from '@nestjs/common';
import { CsvService } from './csv.services';  

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('buscar')
  buscar(
    @Query('q') q: string = '',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ): any {
    return this.csvService.buscarFiltrado(q, Number(page), Number(limit));
  }
}

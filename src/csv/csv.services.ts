// src/csv/csv.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

interface RegistroCSV {
  NOMBRE: string;
  RUC: string;
  CORREO: string;
  REPRESENTANTE: string;
  EXPEDIENTE: string;
  SITUACIÓN_LEGAL: string;
  FECHA_CONSTITUCION: string;
  TIPO: string;
  PAÍS: string;
  REGIÓN: string;
  CANTÓN: string;
  CIUDAD: string;
  CALLE: string;
  NÚMERO: string;
  INTERSECCIÓN: string;
  BARRIO: string;
  TELÉFONO: string;
  CAPITAL_SUSCRITO: string;
  CIIU_NIVEL_1: string;
  CIIU_NIVEL_0: string;
  ÚLTIMO_BALANCE: string;
}

@Injectable()
export class CsvService {
  private data: RegistroCSV[] = [];

  constructor() {
    this.loadCSV();
  }

  private loadCSV() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'emails.csv');
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (row) => {
        this.data.push({
          NOMBRE: row.NOMBRE || '',
          RUC: row.RUC || '',
          CORREO: row.CORREO || '',
          REPRESENTANTE: row.REPRESENTANTE || '',
          EXPEDIENTE: row.EXPEDIENTE || '',
          SITUACIÓN_LEGAL: row['SITUACIÓN_LEGAL'] || '',
          FECHA_CONSTITUCION: row.FECHA_CONSTITUCION || '',
          TIPO: row.TIPO || '',
          PAÍS: row.PAÍS || '',
          REGIÓN: row.REGIÓN || '',
          CANTÓN: row.CANTÓN || '',
          CIUDAD: row.CIUDAD || '',
          CALLE: row.CALLE || '',
          NÚMERO: row.NÚMERO || '',
          INTERSECCIÓN: row.INTERSECCIÓN || '',
          BARRIO: row.BARRIO || '',
          TELÉFONO: row.TELÉFONO || '',
          CAPITAL_SUSCRITO: row.CAPITAL_SUSCRITO || '',
          CIIU_NIVEL_1: row.CIIU_NIVEL_1 || '',
          CIIU_NIVEL_0: row.CIIU_NIVEL_0 || '',
          ÚLTIMO_BALANCE: row.ÚLTIMO_BALANCE || '',
        });
      })
      .on('end', () => {
        console.log(`✅ CSV cargado: ${this.data.length} registros`);
      });
  }

  buscarFiltrado(query: string, page: number, limit: number) {
    const searchTerm = query.toLowerCase();

    const filtrados = this.data.filter(
      (item) =>
        item.NOMBRE.toLowerCase().includes(searchTerm) ||
        item.RUC.toLowerCase().includes(searchTerm) ||
        item.CORREO.toLowerCase().includes(searchTerm)
    );

    const total = filtrados.length;
    const start = (page - 1) * limit;
    const paginados = filtrados.slice(start, start + limit);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: paginados,
    };
  }


}
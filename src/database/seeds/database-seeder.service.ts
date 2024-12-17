import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg'; 
import * as fs from 'fs';
import {  DatabaseConfigForPg } from '../../config/database.config';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client(DatabaseConfigForPg);
  }

  async onModuleInit() {
    try {
      await this.client.connect();
      console.log('Conectado ao banco de dados com sucesso.');
      
      const script = fs.readFileSync('src/database/seeds/dados-semente.sql', 'utf8');
      await this.client.query(script);
      
      console.log('Script executado com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar ou executar script no banco de dados:', error.message);
    } finally {
      await this.client.end();
    }
  }
  
}

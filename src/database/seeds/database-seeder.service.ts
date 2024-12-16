import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg'; 
import * as fs from 'fs';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'geodb', 
      password: '123',
      port: 5432,
    });
  }

  async onModuleInit() {
    await this.client.connect();
    const script = fs.readFileSync('src/database/seeds/dados-semente.sql', 'utf8');
    await this.client.query(script); 
    await this.client.end();
  }
}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Usuario } from '../modules/usuarios/usuarios.entity';
import { PontoDeInteresse } from '../modules/pontos-de-interesse/pontos-de-interesse.entity'; 
import { Categoria } from '../modules/categorias/categorias.entity';  
import { Client } from 'pg';

dotenv.config();

export const checkAndCreateDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: 'postgres', 
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
  });

  try {
    await client.connect();

    // Verifica se o banco de dados já existe
    const res = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}';
    `);

    if (res.rows.length === 0) {
      // Cria o banco de dados se não existir
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Banco de dados ${process.env.DB_NAME} criado com sucesso.`);
    } else {
      console.log(`Banco de dados ${process.env.DB_NAME} já existe.`);
    }
  } catch (error) {
    console.error('Erro ao verificar/criar o banco de dados:', error);
  } finally {
    await client.end();
  }
};


export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Usuario,PontoDeInteresse,Categoria],  
  logging: true,
};

export const DatabaseConfigForPg = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
};


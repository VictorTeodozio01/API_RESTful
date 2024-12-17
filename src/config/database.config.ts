import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Usuario } from '../modules/usuarios/usuarios.entity';
import { PontoDeInteresse } from '../modules/pontos-de-interesse/pontos-de-interesse.entity'; 
import { Categoria } from '../modules/categorias/categorias.entity';  

dotenv.config();

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

import { DataSource } from 'typeorm';
import { Usuario } from './modules/usuarios/usuarios.entity'; // Adapte para suas entidades
import { PontoDeInteresse } from './modules/pontos-de-interesse/pontos-de-interesse.entity'; // Exemplo de outra entidade
import { Categoria } from './modules/categorias/categorias.entity';  // Adicionando a entidade Categoria

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', 
  port: 5432, 
  username: 'postgres', 
  password: '123', 
  database: 'geodb',
  entities: [
    Usuario,  
    PontoDeInteresse,
    Categoria,
  ],
  synchronize: false, 
  logging: true, 
});

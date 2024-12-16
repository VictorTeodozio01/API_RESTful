import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './../src/modules/usuarios/usuarios.entity';
import { DataSource } from 'typeorm';
import { AppService } from './../src/app.service';

describe('Database Connection Test', () => {
  let app;
  let connection: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
          username: process.env.POSTGRES_USER || 'postgres',
          password: process.env.POSTGRES_PASSWORD || '123',
          database: process.env.POSTGRES_DB || 'geodb',
          entities: [Usuario],
          synchronize: true, 
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = app.get(DataSource);
    await app.init();
  });

  it('should connect to the database', async () => {
    expect(connection.isInitialized).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});

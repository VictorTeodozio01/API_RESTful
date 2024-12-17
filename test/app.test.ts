import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CategoriasService } from './../src/modules/categorias/categorias.service';
import { Usuario } from './../src/modules/usuarios/usuarios.entity';
import { getRepository } from 'typeorm';
import { PontoDeInteresse } from '../src/modules/pontos-de-interesse/pontos-de-interesse.entity'; 
import { Categoria } from '../src/modules/categorias/categorias.entity';
import { UsuariosService } from './../src/modules/usuarios/usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


describe('Testes de Aplicação', () => {

    describe('AppController (e2e)', () => {
      let app: INestApplication;
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
  
        app = moduleFixture.createNestApplication();
        await app.init();
      });
  
      it('/ (GET)', () => {
        return request(app.getHttpServer())
          .get('/')
          .expect(200)
          .expect('Hello World!');
      });
  
      afterAll(async () => {
        await app.close();
      });
    });
  
    describe('UsuariosService', () => {
      let service: UsuariosService;
      let repository: jest.Mocked<Repository<Usuario>>;
  
      const mockRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      };
  
      beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            UsuariosService,
            {
              provide: getRepositoryToken(Usuario),
              useValue: mockRepository,
            },
          ],
        }).compile();
  
        service = module.get<UsuariosService>(UsuariosService);
        repository = module.get<jest.Mocked<Repository<Usuario>>>(getRepositoryToken(Usuario));
      });
  
      it('deve ser definido', () => {
        expect(service).toBeDefined();
      });
  
      it('deve chamar o método find do repositório', async () => {
        mockRepository.find.mockResolvedValueOnce([]);
        const users = await service.listarTodos();
        expect(mockRepository.find).toHaveBeenCalled();
        expect(users).toEqual([]);
      });
  
      afterAll(() => {
        jest.clearAllMocks();  
      });
    });
  
    describe('CategoriasService', () => {
      let service: CategoriasService;
      let repository: jest.Mocked<Repository<Categoria>>;
  
      const mockRepository = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      };
  
      beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CategoriasService,
            {
              provide: getRepositoryToken(Categoria),
              useValue: mockRepository,
            },
          ],
        }).compile();
  
        service = module.get<CategoriasService>(CategoriasService);
        repository = module.get<jest.Mocked<Repository<Categoria>>>(getRepositoryToken(Categoria));
      });
  
      it('deve ser definido', () => {
        expect(service).toBeDefined();
      });
  
      it('deveria chamar o método find do repositório', async () => {
        mockRepository.find.mockResolvedValueOnce([]);
        const categorias = await service.listarTodas();
        expect(mockRepository.find).toHaveBeenCalled();
        expect(categorias).toEqual([]);
      });
  
      afterAll(() => {
        jest.clearAllMocks();
      });
    });
  
    describe('PontosDeInteresseController (e2e)', () => {
      let app: INestApplication;
  
      beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
  
        app = moduleFixture.createNestApplication();
        await app.init();
  
        await seedData();
      });
  
      async function seedData() {
        const categoriaRepo = getRepository(Categoria);
        const categoria = categoriaRepo.create({ nome: 'Categoria 1' });
        await categoriaRepo.save(categoria);
  
        const pontoRepo = getRepository(PontoDeInteresse);
        const ponto = pontoRepo.create({
          nome: 'Parque Central',
          localizacao: { type: 'Point', coordinates: [-46.633309, -23.55052] },
          categoria: categoria,
        });
        await pontoRepo.save(ponto);
      }
  
      it('Deve listar todos os pontos de interesse (GET /pontos-de-interesse)', async () => {
        const response = await request(app.getHttpServer())
          .get('/pontos-de-interesse')
          .expect(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
      });
  
      it('Deve criar um ponto de interesse (POST /pontos-de-interesse)', async () => {
        const ponto = {
          nome: 'Parque Central',
          localizacao: { type: 'Point', coordinates: [-46.633309, -23.55052] },
          categoriaId: 1,
        };
  
        const response = await request(app.getHttpServer())
          .post('/pontos-de-interesse')
          .send(ponto)
          .expect(201);
  
        expect(response.body.nome).toBe(ponto.nome);
        expect(response.body.localizacao).toHaveProperty('type', 'Point');
      });
  
      afterAll(async () => {
        await app.close();
      });
    });
  
  });
  